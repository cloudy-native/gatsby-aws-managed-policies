import { Code, Heading, VStack, Button, ButtonGroup } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import PolicyCardGrid from "../components/policy-card-grid"
import { Link as GatsbyLink } from 'gatsby'

function ServiceDetailPage({ data, classes, pageContext }) {
  console.log('data', data)
  console.log('classes', classes)
  console.log('pageContext', pageContext)

  const nodes = data.allPolicyMetadata.nodes
  const policyPageNodes = nodes.map(node => {
    const { actions, managedPolicy, services } = node

    return {
      managedPolicy,
      actions,
      services
    }
  })
const service = pageContext.service

  return (
    <VStack align="stretch" spacing={5}>
      <ButtonGroup>
        <Button as={GatsbyLink} colorScheme="blue" size="xs"  to={`/service/${service}`}>Policies for Service</Button>
        <Button as={GatsbyLink}  size="xs" to={`/reference/${service}`}>Service Reference</Button>
      </ButtonGroup>

      <Heading size="lg">Managed Policies for Service: {service}</Heading>
      <PolicyCardGrid policyPageNodes={policyPageNodes} />
    </VStack>
  )
}

export default ServiceDetailPage

export const pageQuery = graphql`
  query ($service: String) {
    allPolicyMetadata(filter: {services: {in: [$service]}}) {
      nodes {
        services
        actions
        managedPolicy {
          policy {
            Arn
            PolicyName
            PolicyId
            Path
            Description
            DefaultVersionId
          }
          document {
            Effect
            Sid
            Action
            NotAction
            NotResource
            Resource
          }
        }
      }
    }
  }
`
