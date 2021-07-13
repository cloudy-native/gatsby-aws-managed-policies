import {
  Button,
  ButtonGroup,
  Heading,
  VStack,
  Grid,
  GridItem,
  Text,
  Code
} from '@chakra-ui/react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import React from 'react';
import PolicyCardGrid from '../components/policy-card-grid';

function ServiceDetailPage({ data, classes, pageContext }) {
  console.log('data', data);
  const policyNodes = data.allPolicyMetadata.nodes;
  const policyPageNodes = policyNodes.map((node) => {
    const { actions, managedPolicy, services } = node;

    return {
      managedPolicy,
      services,
      actions
    };
  });
  const serviceDetail = data.allServiceMetadata.nodes[0];

  return (
    <VStack align="stretch" spacing={5}>
      <ButtonGroup>
        <Button
          as={GatsbyLink}
          colorScheme="blue"
          size="xs"
          to={`/service/${serviceDetail.ServiceShortName}`}
        >
          Policies for Service
        </Button>
        <Button
          as={GatsbyLink}
          size="xs"
          to={`/reference/${serviceDetail.ServiceShortName}`}
        >
          Service Actions Reference
        </Button>
      </ButtonGroup>

      <Heading size="lg">{serviceDetail.ServiceName}</Heading>
      <Grid templateColumns="repeat(12, 1fr)">
        <GridItem colSpan={2}>
          <Text fontWeight="bold">Short name</Text>
        </GridItem>
        <GridItem colSpan={10}>
          <Text>{serviceDetail.ServiceShortName}</Text>
        </GridItem>

        <GridItem colSpan={2}>
          <Text fontWeight="bold">ARN Format</Text>
        </GridItem>
        <GridItem colSpan={10}>
          <Code>{serviceDetail.ARNFormat}</Code>
        </GridItem>

        <GridItem colSpan={2}>
          <Text fontWeight="bold">ARN Regex</Text>
        </GridItem>
        <GridItem colSpan={10}>
          <Code>{serviceDetail.ARNRegex}</Code>
        </GridItem>
      </Grid>

      <PolicyCardGrid policyPageNodes={policyPageNodes} />
    </VStack>
  );
}

export default ServiceDetailPage;

export const pageQuery = graphql`
  query ($service: String) {
    allServiceMetadata(filter: { ServiceShortName: { in: [$service] } }) {
      nodes {
        id
        ServiceName
        ServiceShortName
        ARNFormat
        ARNRegex
        DocLink
        conditionKeys
      }
    }
    allPolicyMetadata(filter: { services: { in: [$service] } }) {
      nodes {
        actions
        services
        managedPolicy {
          policy {
            Arn
            PolicyName
            PolicyId
            Path
            Description
            DefaultVersionId
          }
          document {
            Effect
            Sid
            Action
            NotAction
            NotResource
            Resource
          }
        }
      }
    }
  }
`;
