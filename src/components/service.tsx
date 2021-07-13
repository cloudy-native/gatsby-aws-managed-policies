import { Button } from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import React from 'react';

function Service({ service }) {
  return (
    <>
      {
        service === '*'
          ? <Button disabled size="xs" mr={1} mb={1}>
            {service}
          </Button>
          : <Button as={GatsbyLink} to={`/service/${service}`} size="xs" mr={1} mb={1}>
            {service}
          </Button>
      }
    </>
  );
}

export default Service;

