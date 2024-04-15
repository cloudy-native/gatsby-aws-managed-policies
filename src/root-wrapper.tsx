import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import Layout from './components/layout';

const theme = extendTheme({
});

export const wrapPageElement = ({ element }) => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>{element}</Layout>
    </ChakraProvider>
  );
};
