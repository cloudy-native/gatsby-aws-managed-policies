import {
  Box,
  Container,
  Divider,
  Text
} from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import NavBar from './navbar';

import { Icon } from '@chakra-ui/react';
import { FaLinkedin } from 'react-icons/fa';
import Footer from './footer';

const LinkedInIcon = () => {
  return <Icon as={FaLinkedin} boxSize={6} color="linkedin.500" />;
};

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
        }
      }
    }
  `);

  const { siteMetadata } = data.site;

  return (
    <Container maxWidth="6xl">
      <NavBar my="4" siteTitle={siteMetadata?.title || `Title`} />
      <Text fontSize="sm">{siteMetadata?.description}</Text>
      <Divider mt={4} />
      <Box my="4" as="main">
        {children}
      </Box>
      <Divider />
      <Footer />
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
