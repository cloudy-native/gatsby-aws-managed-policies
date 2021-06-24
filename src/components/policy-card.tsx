import { Box, Link, Text, VStack } from "@chakra-ui/react"
import { Link as GatsbyLink } from "gatsby"
import React from "react"
import ServicesList from "./services-list"

function PolicyCard({ policyPageNode }) {
  const { managedPolicy, services, actions } = policyPageNode
  const { policy, document } = managedPolicy

  return (
    <Box p="4" borderWidth="1px" shadow="md" borderRadius="lg">
      <VStack spacing={2} align="stretch">
        <Link as={GatsbyLink} size="sm" to={`/${policy.PolicyName}`}>
          <Text fontWeight="bold">{policy.PolicyName}</Text>
        </Link>
        <Text fontSize="sm">{policy.Description}</Text>
        <ServicesList services={services} />
      </VStack>
    </Box>
  )
}

export default PolicyCard
