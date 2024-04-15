import { Box } from '@chakra-ui/react';
import React from 'react';
import Service from './service';

function ServicesList({ services }) {
  return (
    <Box>
      {
        services.map((service) => (
          <Service service={service} />
        ))
      }
    </Box>
  );
}

export default ServicesList;
