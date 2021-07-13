import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  Code,
  Container,
  Grid,
  GridItem,
  Heading,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import React, { useMemo } from 'react';
import { useTable } from 'react-table';
import ServicesList from '../components/services-list';

function PolicyDetailPage({ data, classes, pageContext }) {
  const columns = useMemo(
    () => [
      {
        Header: 'Action',
        accessor: 'Action',
        Cell: ({ cell: { value } }) => (
          <Button as={GatsbyLink} to={`/action/${value}`} size="xs">
            {value}
          </Button>
        )
      },
      {
        Header: 'Access Level',
        accessor: 'AccessLevel'
      },
      {
        Header: 'Description',
        accessor: 'Description'
      }
    ],
    []
  );

  const policyMetadata = data.allPolicyMetadata.nodes[0];

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({
      columns,
      // TODO query action rows
      data: useMemo(() => [], [])
    });

  const { managedPolicy, services, actions } = data.allPolicyMetadata.nodes[0];
  const { policy, document } = managedPolicy;

  return (
    <Container maxWidth="100%" p={0}>
      <VStack spacing={4} align="stretch">
        <Heading
          as={Link}
          fontSize="xl"
          href={`https://console.aws.amazon.com/iam/home?region=us-east-1#/policies/arn:aws:iam::aws:policy/${policy.PolicyName}$jsonEditor`}
        >
          {policy.PolicyName} <ExternalLinkIcon />
        </Heading>
        <Text>{policy.Description}</Text>
        <ServicesList services={services} />
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={1}>
            <Text fontWeight="bold">ARN</Text>
          </GridItem>
          <GridItem colSpan={11}>
            <Code>{policy.Arn}</Code>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontWeight="bold">PolicyId</Text>
          </GridItem>
          <GridItem colSpan={11}>
            <Code>{policy.PolicyId}</Code>
          </GridItem>
          <GridItem colSpan={1}>
            <Text fontWeight="bold">Path</Text>
          </GridItem>
          <GridItem colSpan={11}>
            <Code>{policy.Path}</Code>
          </GridItem>
        </Grid>
        <Code
          display="block"
          whiteSpace="pre"
          children={JSON.stringify(document, null, 2)}
        />
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map((headerGroup) => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <Th>{column.render('Header')}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map((row) => {
              prepareRow(row);
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map((cell) => (
                    <Td p={1} {...cell.getCellProps()}>
                      {cell.render('Cell')}
                    </Td>
                  ))}
                </Tr>
              );
            })}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  );
}

export default PolicyDetailPage;

export const pageQuery = graphql`
  query ($PolicyName: String) {
    allPolicyMetadata(
      filter: { managedPolicy: { policy: { PolicyName: { eq: $PolicyName } } } }
    ) {
      nodes {
        services
        actions
        managedPolicy {
          document {
            Effect
            Sid
            Action
            Resource
            NotAction
            NotResource
          }
          policy {
            PolicyName
            PolicyId
            Arn
            Path
            DefaultVersionId
            AttachmentCount
            PermissionsBoundaryUsageCount
            IsAttachable
            Description
            CreateDate
            UpdateDate
          }
        }
      }
    }
  }
`;
