import { Heading, VStack } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React from 'react';
import PolicyCardGrid from '../components/policy-card-grid';
import { PolicyNode } from '../model';

function ActionDetailPage({ data, classes, pageContext }) {
  const policyNodes: PolicyNode[] = data.allPolicyMetadata.nodes;

  return (
    <VStack align="stretch" spacing={5}>
      <Heading size="2xl">
        Managed Policies for Action: {pageContext.Action}
      </Heading>

      <PolicyCardGrid policyNodes={policyNodes} />
    </VStack>
  );
}

export default ActionDetailPage;

export const pageQuery = graphql`
  query ($Action: String) {
    allPolicyMetadata(
      filter: {actions: {in: [$Action]}}
      sort: {policy: {PolicyName: ASC}}
    ) {
      nodes {
        services
        actions
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
`;
