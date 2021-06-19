import { Code, Heading, VStack } from "@chakra-ui/react"
import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import { Card } from '../components/policy-card'
import PolicyCardGrid from "../components/policy-card-grid"

function ServiceDetailPage({ pageContext }) {
  const { service, policyData } = pageContext

  const cards: Card[] = policyData.slice(0, 10).map(p => {
    return {
      policy: p.policy,
      document: p.document,
      services: p.services
    }
  })

  return (
    <>
      <VStack align="stretch" spacing={5}>
        <Heading size="lg">Service: {service}</Heading>
        <PolicyCardGrid cards={cards} />
      </VStack>
    </>
  )
}

export default ServiceDetailPage
