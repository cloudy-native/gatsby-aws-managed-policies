import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
    Button,
    Link,
    Table,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr
} from '@chakra-ui/react';
import { Link as GatsbyLink } from 'gatsby';
import React, { useMemo } from 'react';
import { useSortBy, useTable } from 'react-table';

const ActionButtonColors = {
  List: 'blue',
  'Permissions management': 'cyan',
  Read: 'green',
  Tagging: 'pink',
  Write: 'yellow'
};

function buttonFor(accessLevel: string) {
  const color = ActionButtonColors[accessLevel] || 'lightgray';

  return (
    <Button variant="solid" colorScheme={color} size="xs">
      {accessLevel}
    </Button>
  );
}

function ActionsTable({ nodes }) {
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
        Cell: ({ cell: { value } }) => (
          <Link href={value} isExternal>
            Docs <ExternalLinkIcon />
          </Link>
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
                <Th {...column.getHeaderProps()}>
                  <Text>{column.render('Header')}</Text>
                </Th>
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

export default ActionsTable;
