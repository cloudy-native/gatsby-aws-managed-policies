import {
  Card,
  CardBody,
  CardHeader,
  Text,
  VStack
} from '@chakra-ui/react';
import React from 'react';
import { PolicyNode } from '../model';
import PolicyLink from './policy-link';
import ServicesList from './services-list';

function PolicyCard({policyNode}) {
  const {policy} = policyNode

  return (
    <Card>
      <CardHeader>
        <VStack alignItems="flex-start">
          <PolicyLink policyNode={policyNode} />
          <Text fontSize="sm">{policy.PolicyName}</Text>
        </VStack>
      </CardHeader>
      <CardBody>
        <ServicesList services={policyNode.services} />
      </CardBody>
    </Card>
  );
}

export default PolicyCard;
