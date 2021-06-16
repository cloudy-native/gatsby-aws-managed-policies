import { Container } from "@chakra-ui/react"
import { graphql } from "gatsby"
import React from "react"
import { Card } from '../components/policy-card'
import PolicyCardGrid from '../components/policy-card-grid'
import SEO from "../components/seo"
const slug = require("slug")

function IndexPage({ data }) {
  const cards: Card[] = data.allPolicyMetadata.nodes.map(node => {
    return {
      policy: node.policy,
      document: node.document,
      services: node.services
    }
  })

  return (
    <>
      <SEO title="Home" />
      <PolicyCardGrid cards={cards} />
    </>
  )
}

export default IndexPage

export const query = graphql`
  {
    allPolicyMetadata(limit: 100, sort: {fields: policy___PolicyName}) {
      nodes {
        services
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
`
