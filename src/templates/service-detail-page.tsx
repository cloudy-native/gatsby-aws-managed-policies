import {
  Code,
  HStack,
  Heading,
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
import ActionsTable from '../components/actions-table';
import PolicyCardGrid from '../components/policy-card-grid';

function ServiceDetailPage({ data, classes, pageContext }) {
  const { allPolicyMetadata, allServiceMetadata, allActionMetadata } = data;
  const policyNodes = allPolicyMetadata.nodes.map((node: any) => {
    const { policy, actions, services } = node;

    return {
      policy,
      services,
      actions
    };
  });
  const { ServiceName, ServiceShortName, ARNFormat, ARNRegex, conditionKeys } =
    allServiceMetadata.nodes[0];
  const actionNodes = allActionMetadata.nodes;

  // Wish I could get a Grid with auto-fit columns working
  //
  return (
    <>
      <Heading size="lg">Service: {ServiceName}</Heading>
      <VStack alignItems={'flex-start'} pt={2}>
        <HStack>
          <Text as="b">Short Name:</Text>
          <Text>{ServiceShortName}</Text>
        </HStack>
        <HStack>
          <Text as="b">ARN Format:</Text>
          <Code>{ARNFormat}</Code>
        </HStack>
        <HStack>
          <Text as="b">ARN Regex:</Text>
          <Code>{ARNRegex}</Code>
        </HStack>
      </VStack>
      <Tabs isFitted pt={10} variant="enclosed">
        <TabList>
          <Tab>Referenced Policies</Tab>
          <Tab>Actions</Tab>
          <Tab>Conditions</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <PolicyCardGrid policyNodes={policyNodes} />
          </TabPanel>
          <TabPanel>
            <ActionsTable nodes={actionNodes}></ActionsTable>
          </TabPanel>
          <TabPanel>
            <VStack alignItems={'flex-start'}>
              {conditionKeys.map((conditionKey: string) => (
                <Code>{conditionKey}</Code>
              ))}
            </VStack>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
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
    allActionMetadata(
      filter: { service: { eq: $service } }
      sort: { AccessLevel: ASC }
    ) {
      nodes {
        Action
        Description
        AccessLevel
        ServiceName
        DocLink
        service
      }
    }
    allPolicyMetadata(filter: { services: { in: [$service] } }) {
      nodes {
        actions
        services
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
