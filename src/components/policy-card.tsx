import { Box, Button, Text, VStack, Link, Divider } from "@chakra-ui/react"
import { Link as GatsbyLink } from "gatsby"
import React from "react"
import ServicesList from './services-list'

export interface Card {
    policy: any
    document: any
    services: string[]
}

function PolicyCard({ card }) {
    return (
        <Box p="4" borderWidth="1px" shadow="md">
            <VStack spacing={2} align="stretch">
                <Link as={GatsbyLink} size="sm" to={`/${card.policy.PolicyName}`}>
                    <Text fontWeight="bold">{card.policy.PolicyName}</Text>
                </Link>
                <Text fontSize="sm">
                    {card.policy.Description}
                </Text>
                <ServicesList services={card.services} />
            </VStack>
        </Box>
    )
}

export default PolicyCard
