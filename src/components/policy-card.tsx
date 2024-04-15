import { Box, Button, Card, CardBody, CardHeader, Divider, Heading, Link as ChakraLink, Stack, Text, VStack, CardFooter, Flex, Spacer } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import React from 'react';
import ServicesList from './services-list';

function PolicyCard({ policyPageNode }) {
  const { managedPolicy, services } = policyPageNode;
  const { policy } = managedPolicy;
  const { PolicyName, Description } = policy

  return (
    <Card>
      <CardHeader>
        <VStack spacing={2}>
        <Button as={GatsbyLink} size={"sm"} to={`/${PolicyName}`}>
          {PolicyName}
        </Button>
          <Divider/>
          <Text fontSize="sm">{Description}</Text>
        </VStack>
      </CardHeader>
      <CardBody>
        <ServicesList services={services} />
      </CardBody>
    </Card>
  );
}

export default PolicyCard;
