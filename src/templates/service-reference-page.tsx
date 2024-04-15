import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Button,
  ButtonGroup,
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
import { useSortBy, useTable } from 'react-table';

const ActionButtonColors = {
  List: 'lightblue',
  'Permissions management': 'lightcyan',
  Read: 'lightgreen',
  Tagging: 'lightpink',
  Write: 'lightyellow',
};

function buttonFor(accessLevel: string) {
  const color = ActionButtonColors[accessLevel] || 'lightgray';

  return (
    <Button variant="solid" bgColor={color} size="xs">
      {accessLevel}
    </Button>
  );
}

function AccessLevelTable({ nodes }) {
  console.log('### nodes', nodes)
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
        Header: 'Access',
        accessor: 'AccessLevel',
        Cell: ({ cell: { value } }) => buttonFor(value)
      },
      {
        Header: 'Reference',
        accessor: 'DocLink',
        Cell: ({ cell: { value } }) => <Link href={value} isExternal>Docs <ExternalLinkIcon /></Link>
      },
      {
        Header: 'Description',
        accessor: 'Description'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable(
      {
        columns,
        data: useMemo(() => nodes, [])
      },
      useSortBy
    );

  return (
    <>
      <Table {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup) => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <Th {...column.getHeaderProps()}><Text>{column.render('Header')}</Text></Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <Tr {...row.getRowProps()}>
                {row.cells.map((cell) => (
                  <Td fontSize="sm" p={1} {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </>
  );
}

function ServiceReferencePage({ data, classes, pageContext }) {
  const service = pageContext.service;
  const nodes = data.allActionMetadata.nodes;

  return (
    <VStack align="stretch" spacing={5}>
      <ButtonGroup>
        <Button as={GatsbyLink} size="xs" to={`/service/${service}`}>
          Policies for Service {service}
        </Button>
        <Button
          as={GatsbyLink}
          colorScheme="blue"
          size="xs"
          to={`/reference/${service}`}
        >
          Service Actions Reference for {service}
        </Button>
      </ButtonGroup>

      <Heading size="lg">Service Actions Reference: {service}</Heading>
      <AccessLevelTable nodes={nodes} />
    </VStack>
  );
}

export default ServiceReferencePage;

export const pageQuery = graphql`
  query ($service: String) {
    allActionMetadata(
      filter: {service: {eq: $service}},
      sort: {AccessLevel: ASC}) {
      nodes {
        Action
        Description
        AccessLevel
        ServiceName
        DocLink
        service
      }
    }
  }
`;
