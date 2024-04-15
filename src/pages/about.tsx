import { Text, Link, VStack } from '@chakra-ui/react';
import React from 'react';
import SEO from '../components/seo';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  List,
  ListItem,
  ListIcon,
  OrderedList,
  UnorderedList
} from '@chakra-ui/react';

function AboutPage() {
  return (
    <>
      <SEO title="About" />
      <VStack spacing={4} align="stretch">
        <Text>
          This site was made with{' '}
          <Link href="https://www.gatsbyjs.com" isExternal>
            GatsbyJS
            <ExternalLinkIcon />
          </Link>
          and{' '}
          <Link href="https://chakra-ui.com" isExternal>
            Chakra UI
            <ExternalLinkIcon />
          </Link>
          .
        </Text>
        <Text>
          This site would not be possible without the awesome AWS metadata from{' '}
          <Link
            href="https://github.com/awsles/AwsServices/"
            isExternal
          >
            https://github.com/lesterw1/AwsServices
            <ExternalLinkIcon />
          </Link>.
        </Text>
      </VStack>
    </>
  );
}

export default AboutPage;
