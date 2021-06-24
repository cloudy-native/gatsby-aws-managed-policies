import { Badge, HStack, Link, Button } from "@chakra-ui/react"
import React from "react"
import { Link as GatsbyLink } from "gatsby"
import _ from 'lodash'

function Service({ service }) {
  return (
    <Button as={GatsbyLink} to={`/service/${service}`} size="xs" mr={2} >
      {_.upperCase(service)}
    </Button>
  )
}

export default Service
