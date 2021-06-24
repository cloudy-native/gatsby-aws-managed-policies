import { Badge, HStack, Grid, GridItem } from "@chakra-ui/react"
import React from "react"
import Service from "./service"

function ServicesGrid({ services }) {
  return (
    <Grid templateColumns="repeat(6, 1fr)">
      {services.map(service => (
        <GridItem colSpan={1}>
          <Service service={service} />
        </GridItem>
      ))}
    </Grid>
  )
}

export default ServicesGrid
