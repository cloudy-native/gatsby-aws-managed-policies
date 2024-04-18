import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
  Flex,
  HStack,
  SimpleGrid,
  Spacer,
  Text,
  VStack
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import usePagination from '../hooks/usePagination';
import { PolicyNode } from '../model';
import PolicyCard from './policy-card';

function Pagination({
  items,
  pageLimit,
  setPageItems
}: {
  items: PolicyNode[];
  pageLimit: number;
  setPageItems;
}) {
  const { pageNumber, changePage, pageData, nextPage, previousPage } =
    usePagination(items, pageLimit);

  useEffect(() => {
    setPageItems(pageData);
  }, [pageNumber]);

  const data = pageData();
  const firstPolicy = data[0].policy.PolicyName;
  const lastPolicy = data[data.length - 1].policy.PolicyName;

  return (
    <>
      <VStack alignItems="flex-start">
        <ButtonGroup size={'xs'}>
          <Button leftIcon={<ArrowBackIcon />} onClick={previousPage}>
            Prev Page
          </Button>
          <Text>{pageNumber + 1}</Text>
          <Button rightIcon={<ArrowForwardIcon />} onClick={nextPage}>
            Next Page
          </Button>
        </ButtonGroup>
        <HStack>
          <Text as="b">{firstPolicy}</Text>
          <Text>…</Text>
          <Text as="b">{lastPolicy}</Text>
        </HStack>
      </VStack>
    </>
  );
}

function PolicyCardGrid({ policyNodes }: { policyNodes: PolicyNode[] }) {
  const [pageItems, setPageItems] = useState<PolicyNode[]>([]);

  return (
    <VStack spacing={4} align="stretch">
      <Pagination
        items={policyNodes}
        pageLimit={48}
        setPageItems={setPageItems}
      />
      <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={2}>
        {pageItems.map((policyNode) => (
          <PolicyCard
            key={policyNode.policy.PolicyName}
            policyNode={policyNode}
          />
        ))}
      </SimpleGrid>
    </VStack>
  );
}

export default PolicyCardGrid;
