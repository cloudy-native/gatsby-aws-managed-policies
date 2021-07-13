import {
  Button,
  ButtonGroup,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  VStack
} from '@chakra-ui/react';
import { graphql, Link as GatsbyLink } from 'gatsby';
import React, { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';

function AccessLevelSection({ group }) {
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
        data: useMemo(() => group.nodes, [])
      },
      useSortBy
    );

  return (
    <>
      <Heading size="md">{group.fieldValue}</Heading>
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
  const groups = data.allActionMetadata.group;

  return (
    <VStack align="stretch" spacing={5}>
      <ButtonGroup>
        <Button as={GatsbyLink} size="xs" to={`/service/${service}`}>
          Policies for Service
        </Button>
        <Button
          as={GatsbyLink}
          colorScheme="blue"
          size="xs"
          to={`/reference/${service}`}
        >
          Service Actions Reference
        </Button>
      </ButtonGroup>

      <Heading size="lg">Service Actions Reference: {service}</Heading>
      {groups.map((group) => (
        <AccessLevelSection group={group} />
      ))}
    </VStack>
  );
}

export default ServiceReferencePage;

export const pageQuery = graphql`
  query ($service: String) {
    allActionMetadata(filter: { service: { eq: $service } }) {
      group(field: AccessLevel) {
        nodes {
          Action
          Description
          ServiceName
          service
        }
      }
    }
  }
`;
