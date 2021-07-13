import { graphql } from 'gatsby';
import React from 'react';
import PolicyCardGrid from '../components/policy-card-grid';
import SEO from '../components/seo';
import { PolicyPageNode } from '../model';
const slug = require('slug');

function IndexPage({ data }) {
  const policyPageNodes: PolicyPageNode[] = data.allPolicyMetadata.nodes.map(
    (node) => {
      const { managedPolicy, services, actions } = node;

      return {
        managedPolicy,
        services,
        actions
      };
    }
  );

  return (
    <>
      <SEO title="Home" />
      <PolicyCardGrid policyPageNodes={policyPageNodes} />
    </>
  );
}

export default IndexPage;

export const query = graphql`
  {
    allPolicyMetadata(
      limit: 100
      sort: { fields: managedPolicy___policy___PolicyName }
    ) {
      nodes {
        services
        actions
        managedPolicy {
          document {
            Effect
            Sid
            Action
            Resource
            NotAction
            NotResource
          }
          policy {
            PolicyName
            PolicyId
            Arn
            Path
            DefaultVersionId
            AttachmentCount
            PermissionsBoundaryUsageCount
            IsAttachable
            Description
            CreateDate
            UpdateDate
          }
        }
      }
    }
  }
`;
