import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Code,
  Container,
  HStack,
  Heading,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack
} from '@chakra-ui/react';
import { graphql } from 'gatsby';
import React from 'react';
import ServicesList from '../components/services-list';
import { PolicyNode } from '../model';

function PolicyDetailPage({ data, classes, pageContext }) {
  const policyNode: PolicyNode = data.allPolicyMetadata.nodes[0];
  const { policy, services, document } = policyNode;

  return (
    <Container maxWidth="100%" p={0}>
      <VStack spacing={4} align="stretch">
        <Heading
          fontSize={'2xl'}
          as={Link}
          href={`https://console.aws.amazon.com/iam/home?region=us-east-1#/policies/arn:aws:iam::aws:policy/${policy.PolicyName}$jsonEditor`}
        >
          {policy.PolicyName} details (in AWS console) <ExternalLinkIcon />
        </Heading>

        <VStack alignItems={'flex-start'}>
          <HStack>
            <Text as="b">Policy Name</Text>
            <Text>{policy.PolicyName}</Text>
          </HStack>
          <HStack>
            <Text as="b">Description</Text>
            <Text>{policy.Description}</Text>
          </HStack>
          <HStack>
            <Text as="b">ARN</Text>
            <Text>{policy.Arn}</Text>
          </HStack>
          <HStack>
            <Text as="b">Path</Text>
            <Text>{policy.Path}</Text>
          </HStack>
          <HStack>
            <Text as="b">PolicyId</Text>
            <Text>{policy.PolicyId}</Text>
          </HStack>
          <HStack>
            <Text as="b">AttachmentCount</Text>
            <Text>{policy.AttachmentCount}</Text>
          </HStack>
        </VStack>
        <Tabs isFitted variant="enclosed">
          <TabList>
            <Tab>Referenced Services</Tab>
            <Tab>JSON Policy</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <ServicesList services={services} />
            </TabPanel>
            <TabPanel>
              <Code
                display="block"
                whiteSpace="pre"
                children={JSON.stringify(document, null, 2)}
              />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  );
}

export default PolicyDetailPage;

export const pageQuery = graphql`
  query ($PolicyName: String) {
    allPolicyMetadata(filter: { policy: { PolicyName: { eq: $PolicyName } } }) {
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
        document {
          Effect
          Action
          Resource
        }
      }
    }
  }
`;
