const _ = require(`lodash`)
const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)
const slug = require("slug")

const policyDetailPageTemplate = path.resolve(
    `src/templates/policy-detail-page.tsx`
)

const serviceDetailPageTemplate = path.resolve(
    `src/templates/service-detail-page.tsx`
)

const serviceReferencePageTemplate = path.resolve(
    `src/templates/service-reference-page.tsx`
)

exports.onPostBuild = ({ reporter }) => {
    reporter.info(`❤️ Your Gatsby site has been built!`)
}

exports.createPages = async ({ graphql, actions, reporter }) => {
    const { createPage } = actions

    const policyNamesData = await graphql(`
    {
        allPolicyMetadata {
            nodes {
                services
                actions
                managedPolicy {
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
    }      
`)

    const nodes = policyNamesData.data.allPolicyMetadata.nodes

    // Managed policy detail pages
    //
    nodes.forEach(node => {
        const { managedPolicy, services, actions } = node
        const PolicyName = managedPolicy.policy.PolicyName

        createPage({
            path: `/${PolicyName}/`,
            component: slash(policyDetailPageTemplate),
            context: {
                PolicyName
            },
        })
    })

    // Service detail pages
    //
    const serviceDirectory = {}

    nodes.forEach(node => {
        const { managedPolicy, services, actions } = node

        services.forEach(service => {
            const pageNode = {
                managedPolicy,
                services
            }

            if (!serviceDirectory[service]) {
                serviceDirectory[service] = [pageNode]
            } else {
                serviceDirectory[service].push(pageNode)
            }
        })
    })

    Object.keys(serviceDirectory).forEach(service => {
        createPage({
            path: `/service/${service}/`,
            component: slash(serviceDetailPageTemplate),
            context: {
                service
            }
        })
    })

    // Service reference pages
    //
    Object.keys(serviceDirectory).forEach(service => {
        createPage({
            path: `/reference/${service}/`,
            component: slash(serviceReferencePageTemplate),
            context: {
                service
            }
        })
    })

}
