import {
    GetPolicyCommand,
    GetPolicyVersionCommand,
    IAMClient,
    IAMPaginationConfiguration,
    paginateListPolicies,
} from "@aws-sdk/client-iam"
import Bottleneck from "bottleneck"
import * as fs from "fs"

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
// TODO: Types!
//

const metadataFile = './metadata/managed-policy-metadata.json'

// We make a lot of calls to AWS API. This keeps the rate reasonable.
//
const rateLimiter = new Bottleneck({
    maxConcurrent: 2,
    minTime: 100,
})

function ensureArray(value: any) {
    if (!Array.isArray(value)) {
        return [value]
    } else {
        return value
    }
}

function normalizeStatement(statement: any): any {
    function normalizeField(field: string) {
        if (statement[field]) {
            statement[field] = ensureArray(statement[field])
        }
    }

    normalizeField("Resource")
    normalizeField("NotResource")
    normalizeField("Action")
    normalizeField("NotAction")

    delete statement.Condition
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

    return statement
}

function normalizeDocument(document: any): any {
    const statements = ensureArray(document.Statement)

    return statements.map((statement: any) => normalizeStatement(statement))
}

async function run() {
    const iamClient = new IAMClient({})

    const managedPolicies = []

    const paginationConfiguration: IAMPaginationConfiguration = {
        client: iamClient,
        pageSize: 25,
    }

    for await (const page of paginateListPolicies(paginationConfiguration, { Scope: "AWS" })) {
        managedPolicies.push(...page.Policies)
    }

    const policyMetadata = {}

    const tasks = managedPolicies.map(async managedPolicy => {
        return rateLimiter.schedule(async () => {
            console.log(JSON.stringify(managedPolicy.Arn))

            const policy = await iamClient.send(new GetPolicyCommand({
                PolicyArn: managedPolicy.Arn
            }))
            const policyVersion = await iamClient.send(new GetPolicyVersionCommand({
                PolicyArn: managedPolicy.Arn,
                VersionId: policy.Policy.DefaultVersionId
            }))
            const rawDocument = JSON.parse(
                decodeURIComponent(policyVersion.PolicyVersion.Document)
            )
            const document = normalizeDocument(rawDocument)

            policyMetadata[managedPolicy.PolicyName] = { policy: policy.Policy, document }
        })
    })

    await Promise.all(tasks)

    console.log('Writing metadata')

    fs.writeFileSync(metadataFile, JSON.stringify(policyMetadata, null, 2))
}

run()
