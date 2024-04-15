import {
  GetPolicyCommand,
  GetPolicyVersionCommand,
  IAMClient,
  IAMPaginationConfiguration,
  paginateListPolicies,
  Policy
} from '@aws-sdk/client-iam';
import Bottleneck from 'bottleneck';
import * as fs from 'fs';
import { ensureArray } from '../utils/utils';

// Query all the Managed Policies and dump them out.
//
// The only change we make is to convert single-string [Not]Resource and [Not]Action values
// to a string array. This is because it's valid to declare those fields either way as either
// string or [string].
//
// We also need to normalize the condition values in the same way.
//
// This makes the GraphQL schema easy/possible to define.
//
// We actually omit the Condition for now.
//
// The service needs converting to lower case because it's inconsistent
//
const metadataFile = './metadata/managed-policy-metadata.json';

// We make a lot of calls to AWS API. This keeps the rate reasonable.
//
const rateLimiter = new Bottleneck({
  maxConcurrent: 2,
  minTime: 100
});

function normalizeStatement(statement: any): any {
  function ensureLowerCaseService(actions: string[]): string[] {
    return actions.map(element => {
      const parts = element.split(':')

      if (parts.length == 2) {
        return [parts[0].toLowerCase(), parts[1]].join(':')
      }

      return element
    })
  }

  // Makes sure everything's an array and that the service is lower case
  //
  function normalizeField(field: string) {
    if (statement[field]) {
      statement[field] = ensureLowerCaseService(ensureArray(statement[field]))
    }
  }

  normalizeField('Resource');
  normalizeField('NotResource');
  normalizeField('Action');
  normalizeField('NotAction');

  delete statement.Condition;
  // if (statement.Condition) {
  //     console.log('before', JSON.stringify(s.Condition))
  //     Object.keys(s.Condition).forEach(comparator => {
  //         const comparison = s.Condition[comparator]
  //         console.log('comparator', JSON.stringify(comparator))

  //         Object.keys(comparison).forEach(field => {
  //             console.log('field', JSON.stringify(field))

  //             const value = comparison[field]

  //             console.log('value', JSON.stringify(value))
  //             comparison[field] = ensureArray(comparison[field])
  //         })
  //     })
  //     console.log('after ', JSON.stringify(s.Condition))
  // }

  return statement;
}

function normalizeDocument(document: any): any {
  const statements = ensureArray(document.Statement);

  return statements.map((statement: any) => normalizeStatement(statement));
}

async function run() {
  const iamClient = new IAMClient({});
  const managedPolicies: Policy[] = [];

  const paginationConfiguration: IAMPaginationConfiguration = {
    client: iamClient,
    pageSize: 25
  };

  for await (const page of paginateListPolicies(paginationConfiguration, {
    Scope: 'AWS'
  })) {
    if (page.Policies) {
      managedPolicies.push(...page.Policies);
    }
  }

  // This is a mess
  //
  const policyMetadata: { [key: string]: any } = {};

  const tasks = managedPolicies.map(async (managedPolicy) => {
    return rateLimiter.schedule(async () => {
      console.log('Processing', managedPolicy.Arn);

      const policy = await iamClient.send(
        new GetPolicyCommand({
          PolicyArn: managedPolicy.Arn
        })
      );
      const policyVersion = await iamClient.send(
        new GetPolicyVersionCommand({
          PolicyArn: managedPolicy.Arn,
          VersionId: policy.Policy?.DefaultVersionId
        })
      );
      const rawDocument = JSON.parse(
        decodeURIComponent(policyVersion?.PolicyVersion?.Document || '')
      );
      const document = normalizeDocument(rawDocument);

      const policyName = managedPolicy?.PolicyName || ''

      if (policyName) {
        policyMetadata[policyName] = {
          policy: policy.Policy,
          document
        };
      }
    });
  });

  await Promise.all(tasks);

  fs.writeFileSync(metadataFile, JSON.stringify(policyMetadata, null, 2));
}

run();
