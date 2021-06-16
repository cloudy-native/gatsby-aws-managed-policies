const path = require(`path`)
const fs = require("fs")
const { slash } = require(`gatsby-core-utils`)
const slug = require("slug")

const policyDetailPageTemplate = path.resolve(
  `src/templates/policy-detail-page.tsx`
)

const serviceDetailPageTemplate = path.resolve(
  `src/templates/service-detail-page.tsx`
)

exports.onPostBuild = ({ reporter }) => {
  reporter.info(`❤️ Your Gatsby site has been built!`)
}

function servicesForPolicyStatement(statement) {
  const services = []

  if (statement.Action) {
    statement.Action.forEach(action => {
      services.push(action.split(":")[0])
    })
  }

  if (statement.NotAction) {
    statement.NotAction.forEach(action => {
      services.push(action.split(":")[0])
    })
  }

  return [...new Set(services)]
}

function servicesForPolicyDocument(document) {
  const services = document.map(statement =>
    servicesForPolicyStatement(statement)
  )

  return [...new Set(services.flat())]
}

function actionsForPolicyStatement(statement) {
  const actions = []

  if (statement.Action) {
    statement.Action.forEach(action => {
      actions.push(action)
    })
  }

  if (statement.NotAction) {
    statement.NotAction.forEach(action => {
      actions.push(action)
    })
  }

  return [...new Set(actions)]
}

function actionsForPolicyDocument(document) {
  const actions = document.map(statement =>
    actionsForPolicyStatement(statement)
  )

  return [...new Set(actions.flat())]
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  const data = await graphql(`
    {
      allPolicyMetadata {
        nodes {
          document {
            Action
            Effect
            NotAction
            NotResource
            Resource
          }
          services
          actions {
            AccessLevel
            Action
            Description
            DocLink
            ServiceName
          }
          policy {
            Arn
            PolicyName
            PolicyId
            Path
            Description
            DefaultVersionId
          }
        }
      }
    }
  `)

  // Managed policy detail pages
  //
  data.data.allPolicyMetadata.nodes.forEach(node => {
    const { policy, document, services, actions } = node

    createPage({
      path: `/${node.policy.PolicyName}/`,
      component: slash(policyDetailPageTemplate),
      context: {
        policy,
        document,
        services,
        actions,
      },
    })
  })

  // Service detail pages
  //
  const serviceDirectory = {}

  data.data.allPolicyMetadata.nodes.forEach(node => {
    const { policy, document } = node

    const services = servicesForPolicyDocument(document)

    services.forEach(service => {
      const policyData = {
        policy,
        document,
        services
      }
      if (!serviceDirectory[service]) {
        serviceDirectory[service] = [policyData]
      } else {
        serviceDirectory[service].push(policyData)
      }
    })
  })

  Object.keys(serviceDirectory).forEach(service => {
    createPage({
      path: `/service/${service}/`,
      component: slash(serviceDetailPageTemplate),
      context: {
        service,
        policyData: serviceDirectory[service],
      },
    })
  })
}

exports.sourceNodes = ({ actions, createNodeId, createContentDigest }) => {
  const { createNode } = actions

  // Policies
  //
  const managedPolicyMetadata = JSON.parse(
    fs.readFileSync("./metadata/managed-policy-metadata.json", "utf-8")
  )

  // Actions
  //
  const actionMetadata = JSON.parse(
    fs.readFileSync("./metadata/action-metadata.json", "utf-8")
  )

  const actionDirectory = {}

  actionMetadata.forEach(action => {
    actionDirectory[action.Action] = action
  })

  // String link service1:action1 service2:action2 ... so we can expand glob patterns in actions. Space is the delimiter,
  // and we convert '*' to '[\w:]+'
  //
  const actionGlobSource = actionMetadata.map(action => action.Action).join(" ")

  Object.keys(managedPolicyMetadata).forEach(policyName => {
    const value = managedPolicyMetadata[policyName]
    const services = servicesForPolicyDocument(value.document)
    const actions = actionsForPolicyDocument(value.document)

    value["services"] = services

    // Details of the unique actions in this policy, expanded with any wildcards in
    // the original actions
    //
    const expandedActionList = actions
      .map(action => {
        const search = action.replace(new RegExp("\\*", "g"), "[\\w:]+")
        const re = new RegExp(search, "g")

        return [...actionGlobSource.matchAll(re)]
      })
      .flat()
      .flat()

    value["actions"] = [...new Set(expandedActionList)].sort().map(action => {
      return actionDirectory[action]
    })

    const nodeMeta = {
      id: createNodeId(`managed-policy-${policyName}`),
      parent: null,
      children: [],
      internal: {
        type: `PolicyMetadata`,
        mediaType: `application/json`,
        content: JSON.stringify(value),
        contentDigest: createContentDigest(value),
      },
    }

    const node = Object.assign({}, value, nodeMeta)
    // console.log("node", JSON.stringify(node, null, 2))

    createNode(node)
  })

  actionMetadata.slice(0, 1).forEach(action => {
    const nodeMeta = {
      id: createNodeId(`action-${action.Action}`),
      parent: null,
      children: [],
      internal: {
        type: `ActionMetadata`,
        mediaType: `application/json`,
        content: JSON.stringify(action),
        contentDigest: createContentDigest(action),
      },
    }

    const node = Object.assign({}, action, nodeMeta)

    createNode(node)
  })
}
