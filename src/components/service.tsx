import { Badge, HStack, Link } from "@chakra-ui/react"
import React from "react"
import { Link as GatsbyLink } from 'gatsby'

function Service({ service }) {
    return (
        <Badge mr={2}>
            <Link as={GatsbyLink} to={`/service/${service}`}>
                {service}
            </Link>
        </Badge>
    )
}

export default Service
