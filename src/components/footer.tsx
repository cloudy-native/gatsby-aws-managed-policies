import { Link as ChakraLink, Flex, Icon, Spacer, Text } from '@chakra-ui/react';
import React from 'react';
import { FaLinkedin } from 'react-icons/fa';

const LinkedInIcon = () => {
  return <Icon as={FaLinkedin} boxSize={6} color="linkedin.500" />;
};

const Footer = () => {
  return (
    <Flex as="footer" my="2">
      <Text fontSize="xs">
        © {new Date().getFullYear()}. Not affiliated with, supported by,
        endorsed by, connected to, employed by, or sponsored by AWS whatsoever.
        I'm just a fan.
      </Text>
      <Spacer />
      <Text fontSize="xs">Made with ❤️ by Stephen Harrison </Text>
      <Spacer />
      <ChakraLink
        href="https://www.linkedin.com/in/stephenharrison/"
        isExternal
      >
        <LinkedInIcon />
      </ChakraLink>
    </Flex>
  );
};

export default Footer;
