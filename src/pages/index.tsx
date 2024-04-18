import { Heading, VStack } from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React from 'react';
import PolicyCardGrid from '../components/policy-card-grid';
import SEO from '../components/seo';
import { PolicyNode } from '../model';
const slug = require('slug');

function IndexPage({ data }) {
  const policyNodes: PolicyNode[] = data.allPolicyMetadata.nodes.map(
    (node: PolicyNode) => {
      const { policy, services, actions } = node;

      return {
        policy,
        services,
        actions
      };
    }
  );

  return (
    <>
      <SEO title="Home" />
      <VStack spacing={10} align="stretch">
        <Heading fontSize={'2xl'}>All AWS Managed Policies</Heading>
        <PolicyCardGrid policyNodes={policyNodes} />
      </VStack>
    </>
  );
}

export default IndexPage;

export const query = graphql`
  {
    allPolicyMetadata(
      sort: { policy: { PolicyName: ASC } } 
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
