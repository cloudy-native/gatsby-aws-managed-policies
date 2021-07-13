import { Button, ButtonGroup, Heading, VStack } from '@chakra-ui/react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import React from 'react';
import PolicyCardGrid from '../components/policy-card-grid';

function ActionDetailPage({ data, classes, pageContext }) {
  const nodes = data.allPolicyMetadata.nodes;

  const policyPageNodes = nodes.map((node) => {
    const { actions, managedPolicy, services } = node;

    return {
      actions,
      managedPolicy,
      services
    };
  });

  return (
    <VStack align="stretch" spacing={5}>
      <Heading size="lg">
        Managed Policies for Action: {pageContext.Action}
      </Heading>

      <PolicyCardGrid policyPageNodes={policyPageNodes} />
    </VStack>
  );
}

export default ActionDetailPage;

export const pageQuery = graphql`
  query ($Action: String) {
    allPolicyMetadata(
      filter: { actions: { in: [$Action] } }
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
