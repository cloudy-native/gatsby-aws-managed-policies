import { ActionDetail, ManagedPolicy, Statement } from "../model"
const fs = require("fs")

// Policies
//
const managedPolicyMetadata: { [name: string]: ManagedPolicy } = JSON.parse(
    fs.readFileSync("./metadata/managed-policy-metadata.json", "utf-8")
)

// Actions
//
const actionDetailMetadata: ActionDetail[] = JSON.parse(
    fs.readFileSync("./metadata/action-metadata.json", "utf-8")
)

// Make a map of actions
//
const actionDetailLookup: { [action: string]: ActionDetail } = {}
actionDetailMetadata.forEach(action => {
    actionDetailLookup[action.Action] = action
})

export function getManagedPolicyMetadata(): { [name: string]: ManagedPolicy } {
    return managedPolicyMetadata
}

export function getActionDetailMetadata(): ActionDetail[] {
    return actionDetailMetadata
}

export function lookupManagedPolicy(policyName: string): ManagedPolicy {
    return managedPolicyMetadata[policyName]
}

export function lookupActionDetail(action: string): ActionDetail {
    return actionDetailLookup[action]
}

export function servicesForPolicyStatement(statement: Statement): string[] {
    const services: string[] = []

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

export function servicesForPolicyDocument(document: Statement[]) {
    const services = document.map(statement =>
        servicesForPolicyStatement(statement)
    )

    return [...new Set(services.flat())]
}

export function actionsForPolicyStatement(statement: Statement): string[] {
    const actions: string[] = []

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

export function actionsForPolicyDocument(document: Statement[]): string[] {
    const actions = document.map(statement =>
        actionsForPolicyStatement(statement)
    )

    return [...new Set(actions.flat())]
}
