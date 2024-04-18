import { Button } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import React from 'react';
import { PolicyNode } from '../model';

function PolicyLink({ policyNode }: { policyNode: PolicyNode }) {
  const {
    policy: { PolicyName }
  } = policyNode;

  return (
    <Button as={GatsbyLink} size={'sm'} to={`/${PolicyName}`}>
      {PolicyName}
    </Button>
  );
}

export default PolicyLink;
