import {
    NodeInput, SourceNodesArgs
} from "gatsby";
import { PolicyPageNode } from "../model";
import {
    actionsForPolicyDocument, getActionDetailMetadata, getManagedPolicyMetadata, lookupManagedPolicy, servicesForPolicyDocument
} from "./managed-policy-utils";
const _ = require("lodash");

exports.sourceNodes = (args: SourceNodesArgs) => {
    const { actions, createNodeId, createContentDigest } = args
    const { createNode } = actions
    const actionDetailMetadata = getActionDetailMetadata()
    const managedPolicyMetadata = getManagedPolicyMetadata()

    // String with the format service1:action1 service2:action2 ... so we can expand glob patterns in actions. Space is the delimiter,
    // and we convert '*' to '[\w:]+' for a poor man's glob -> regex converter.
    //
    const actionGlobSource = actionDetailMetadata.map(action => action.Action).join(" ")

    // ManagedPolicy nodes
    //
    Object.keys(managedPolicyMetadata).forEach(policyName => {
        const managedPolicy = lookupManagedPolicy(policyName)
        const services = servicesForPolicyDocument(managedPolicy.document)
        const rawActions = actionsForPolicyDocument(managedPolicy.document)

        // Details of the unique actions in this policy, expanded with any wildcards in
        // the original actions
        //
        const expandedActionList = rawActions
            .map(action => {
                const search = action.replace(new RegExp("\\*", "g"), "[\\w:]+")
                const re = new RegExp(search, "g")

                return Array.from(actionGlobSource.matchAll(re))
            })
            .flat() // RegExMatchArray[]
            .flat() // string[]
        const actions = [...new Set(expandedActionList)].sort()
        const content = {
            managedPolicy,
            services,
            actions
        }
        const nodeInput: NodeInput = {
            id: createNodeId(`managed-policy-${policyName}`),
            parent: null,
            children: [],
            internal: {
                type: `PolicyMetadata`,
                mediaType: `application/json`,
                content: JSON.stringify(content),
                contentDigest: createContentDigest(content),
            }
        }

        const node = Object.assign({}, content, nodeInput)

        createNode(node)
    })

    // Action nodes
    //
    actionDetailMetadata.forEach(actionDetail => {
        const nodeInput: NodeInput = {
            id: createNodeId(`action-${actionDetail.Action}`),
            parent: null,
            children: [],
            internal: {
                type: `ActionMetadata`,
                mediaType: `application/json`,
                content: JSON.stringify(actionDetail),
                contentDigest: createContentDigest(actionDetail),
            },
        }

        const service = actionDetail.Action.split(':')[0]
        const node = Object.assign({}, actionDetail, { service }, nodeInput)

        createNode(node)
    })
}
