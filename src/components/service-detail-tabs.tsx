import { Button, ButtonGroup } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import React from 'react';

function ServiceDetailTabs({ serviceShortName, serviceFullName }) {
  return (
    <ButtonGroup>
      <Button as={GatsbyLink} size="xs" to={`/service/${serviceShortName}`}>
        Policies for {serviceFullName}
      </Button>
      <Button
        as={GatsbyLink}
        colorScheme="blue"
        size="xs"
        to={`/reference/${serviceShortName}`}
      >
        {serviceFullName} Actions Reference
      </Button>
    </ButtonGroup>
  );
}

export default ServiceDetailTabs;
