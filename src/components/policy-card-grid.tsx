import { SimpleGrid } from '@chakra-ui/react';
import React from 'react';
import { PolicyPageNode } from '../model';
import PolicyCard from './policy-card';

function PolicyCardGrid({ policyPageNodes }) {
  return (
    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={2}>
      {policyPageNodes.map((policyPageNode: PolicyPageNode) => (
        <PolicyCard policyPageNode={policyPageNode} />
      ))}
    </SimpleGrid>
  );
}

export default PolicyCardGrid;
