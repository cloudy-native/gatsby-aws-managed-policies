import { SimpleGrid } from "@chakra-ui/react"
import React from "react"
import PolicyCard, { Card } from './policy-card'

function PolicyCardGrid({ cards }) {
    return (
        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={2}>
            {
                cards.map((card: Card) => (
                    <PolicyCard key={card.policy.PolicyName} card={card} />
                ))
            }
        </SimpleGrid>
    )
}

export default PolicyCardGrid
