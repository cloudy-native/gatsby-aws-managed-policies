import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  Code,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import ServicesList from '../components/services-list';

function PolicyDetailPage({ data, classes, pageContext }) {
  const policyMetadata = data.allPolicyMetadata.nodes[0];

  const { managedPolicy, services, actions } = data.allPolicyMetadata.nodes[0];
  const { policy, document } = managedPolicy;

  return (
    <Container maxWidth="100%" p={0}>
      <VStack spacing={4} align="stretch">
        <Heading
          as={Link}
          fontSize="xl"
          href={`https://console.aws.amazon.com/iam/home?region=us-east-1#/policies/arn:aws:iam::aws:policy/${policy.PolicyName}$jsonEditor`}
        >
          {policy.PolicyName} (in AWS console) <ExternalLinkIcon />
        </Heading>
        <Text>{policy.Description}</Text>
        <Text><Code>{policy.Arn}</Code></Text>
        <Heading fontSize={"lg"}>Referenced services</Heading>
        <ServicesList services={services} />
        <Heading fontSize={"lg"}>Policy</Heading>
        <Code
          display="block"
          whiteSpace="pre"
          children={JSON.stringify(document, null, 2)}
        />
      </VStack>
    </Container>
  );
}

export default PolicyDetailPage;

export const pageQuery = graphql`
  query ($PolicyName: String) {
    allPolicyMetadata(
      filter: { managedPolicy: { policy: { PolicyName: { eq: $PolicyName } } } }
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
