import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Container,
  Divider,
  Flex,
  Link,
  Spacer,
  Text
} from '@chakra-ui/react';
import { graphql, useStaticQuery } from 'gatsby';
import PropTypes from 'prop-types';
import React from 'react';
import NavBar from './navbar';

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

  const { siteMetadata } = data.site

  return (
    <Container maxWidth="6xl">
      <NavBar my="4" siteTitle={siteMetadata?.title || `Title`} />
      <Text fontSize="sm">{siteMetadata?.description}</Text>
      <Divider mt={4} />
      <Box my="4" as="main">
        {children}
      </Box>
      <Divider />
      <Flex as="footer" my="2">
        <Text fontSize="xs">
          © {new Date().getFullYear()}. Not affiliated with, supported by, endorsed
          by, connected to, employed by, or sponsored by AWS whatsoever. I'm just a fan.
        </Text>
        <Spacer />
        <Text fontSize="xs">
          Made with ❤️ by{' '}
          <Link href="https://www.linkedin.com/in/stephenharrison/">
            Stephen Harrison <ExternalLinkIcon />
          </Link>
        </Text>
      </Flex>
    </Container>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired
};

export default Layout;
