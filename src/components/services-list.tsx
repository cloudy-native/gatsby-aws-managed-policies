import { Box } from '@chakra-ui/react';
import React from 'react';
import Service from './service';

function ServicesList({ services }: { services: string[] }) {
  return (
    <Box>
      {services.map((service) => (
        <Service key={service} service={service} />
      ))}
    </Box>
  );
}

export default ServicesList;
