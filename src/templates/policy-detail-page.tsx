import { ExternalLinkIcon } from "@chakra-ui/icons"
import { Code, Container, Grid, GridItem, Heading, Link, Text, VStack, Table, Thead, Tr, Td, Th, Tbody } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React, { useMemo } from "react"
import { useSortBy, useTable } from "react-table"
import ServicesList from '../components/services-list'
import { getActionDetailMetadata } from '../gatsby-api/managed-policy-utils'

function PolicyDetailPage({ data }) {
  console.log('data', data)

  const columns = useMemo(
    () => [
      {
        Header: "Action",
        accessor: "Action",
      },
      {
        Header: "Access Level",
        accessor: "AccessLevel",
      },
      {
        Header: "Description",
        accessor: "Description",
      },
    ],
    []
  )

  const actionRows: any[] = getActionDetailMetadata().map(actionDetail => {
    return {
      Action: actionDetail.Action,
      Description: actionDetail.Description,
      AccessLevel: actionDetail.AccessLevel
    }
  })

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = useTable({
    columns,
    data: useMemo(() => actionRows, [])
  }, useSortBy)

  const { managedPolicy, services, actions } = data.allPolicyMetadata.nodes[0]
  const { policy, document } = managedPolicy

  return (
    <Container maxWidth="100%" p={0}>
      <VStack spacing={4} align="stretch">
        <Heading
          as={Link}
          fontSize="xl"
          href={`https://console.aws.amazon.com/iam/home?region=us-east-1#/policies/arn:aws:iam::aws:policy/${policy.PolicyName}$jsonEditor`}
        >
          {policy.PolicyName} <ExternalLinkIcon />{" "}
        </Heading>
        <Text>{policy.Description}</Text>
        <ServicesList services={services} />
        <Grid templateColumns="repeat(12, 1fr)">
          <GridItem colSpan={1}> <Text fontWeight="bold" fontSize="sm"> ARN </Text> </GridItem>
          <GridItem colSpan={11}> <Text fontSize="sm">{policy.Arn}</Text> </GridItem>

          <GridItem colSpan={1}> <Text fontWeight="bold" fontSize="sm"> PolicyId </Text> </GridItem>
          <GridItem colSpan={11}> <Text fontSize="sm">{policy.PolicyId}</Text> </GridItem>

          <GridItem colSpan={1}> <Text fontWeight="bold" fontSize="sm"> Path </Text> </GridItem>
          <GridItem colSpan={11}> <Text fontSize="sm">{policy.Path}</Text> </GridItem>
        </Grid>
        <Code
          display="block"
          whiteSpace="pre"
          children={JSON.stringify(document, null, 2)}
        />
        <Table {...getTableProps()}>
          <Thead>
            {headerGroups.map(headerGroup => (
              <Tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <Th>{column.render("Header")}</Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody {...getTableBodyProps()}>
            {rows.map(row => {
              prepareRow(row)
              return (
                <Tr {...row.getRowProps()}>
                  {row.cells.map(cell => (
                    <Td fontSize="sm" p={1} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Td>
                  ))}
                </Tr>
              )
            })}
          </Tbody>
        </Table>
      </VStack>
    </Container>
  )
}

export default PolicyDetailPage

export const pageQuery = graphql`
  query ($PolicyName: String) {
    allPolicyMetadata(
      filter: {managedPolicy: {policy: {PolicyName: {eq: $PolicyName}}}}
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
`
