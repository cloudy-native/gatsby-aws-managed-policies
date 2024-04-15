import { Button, ButtonGroup, Flex, HStack, Heading, SimpleGrid, Spacer, Text, VStack } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import usePagination from '../hooks/usePagination';
import { PolicyPageNode } from '../model';
import PolicyCard from './policy-card';
import {ArrowBackIcon, ArrowForwardIcon} from '@chakra-ui/icons'

const Pagination = ({items, pageLimit, setPageItems}) => {
  const { pageNumber, changePage, pageData, nextPage, previousPage } =
    usePagination(items, pageLimit);

  useEffect(() => {
    setPageItems(pageData);
  }, [pageNumber]);

  const data = pageData()
  const firstPolicy = data[0].managedPolicy.policy.PolicyName
  const lastPolicy = data[data.length-1].managedPolicy.policy.PolicyName

  return (
<>
<Flex>
  <Heading fontSize={"md"}>
    {firstPolicy} … {lastPolicy}
  </Heading>
  <Spacer/>
  <ButtonGroup size={"xs"}>
    <Button leftIcon={<ArrowBackIcon />} onClick={previousPage}>Prev Page</Button>
    <Button rightIcon={<ArrowForwardIcon />} onClick={nextPage}>Next Page</Button>
  </ButtonGroup>
</Flex>
</>
  );
};

function PolicyCardGrid( {policyNodes} ) {
  const [pageItems, setPageItems] = useState([]);

  return (
<>
  <VStack spacing={4} align="stretch">
    <Pagination
      items={policyNodes}
      pageLimit={50}
      setPageItems={setPageItems}
      />
    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={2}>
      {pageItems.map((policyPageNode: PolicyPageNode) => (
        <PolicyCard policyPageNode={policyPageNode} />
      ))}
    </SimpleGrid>
  </VStack>
</>
  );
}

export default PolicyCardGrid;
