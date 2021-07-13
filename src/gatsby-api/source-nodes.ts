import { NodeInput, SourceNodesArgs } from 'gatsby';
import { default as rawActionDetailMetadata } from '../../metadata/action-metadata.json';
import { default as rawManagedPolicyMetadata } from '../../metadata/managed-policy-metadata.json';
import { default as rawServiceDetailMetadata } from '../../metadata/service-metadata.json';
import { ActionDetail, ManagedPolicy, ServiceDetail } from '../model';
import {
  actionsForPolicyDocument,
  ensureArray,
  servicesForPolicyDocument
} from '../utils/utils';
const _ = require('lodash');

const actionDetailMetadata = <ActionDetail[]>rawActionDetailMetadata
const managedPolicyMetadata = <{ [key: string]: any }>rawManagedPolicyMetadata
const serviceDetailMetadata = <ServiceDetail[]>rawServiceDetailMetadata

exports.sourceNodes = (args: SourceNodesArgs) => {
  const { actions, createNodeId, createContentDigest } = args;
  const { createNode } = actions;

  // String with the format service1:action1 service2:action2 ... so we can expand glob patterns in actions. Space is the delimiter,
  // and we convert '*' to '[\w:]+' for a poor man's glob -> regex converter.
  //
  const actionGlobSource = actionDetailMetadata
    .map(action => action.Action)
    .join(' ');

  // ManagedPolicy nodes
  //
  Object.keys(managedPolicyMetadata).forEach(policyName => {
    const managedPolicy = managedPolicyMetadata[policyName];
    const services = servicesForPolicyDocument(managedPolicy.document);
    const rawActions = actionsForPolicyDocument(managedPolicy.document);

    // Details of the unique actions in this policy, expanded with any wildcards in
    // the original actions
    //
    const expandedActionList = rawActions
      .map((action) => {
        const search = action.replace(new RegExp('\\*', 'g'), '[\\w:]+');
        const re = new RegExp(search, 'g');

        return Array.from(actionGlobSource.matchAll(re));
      })
      .flat() // RegExMatchArray[]
      .flat(); // string[]
    const actions = [...new Set(expandedActionList)].sort();
    const content = {
      managedPolicy,
      services,
      actions
    };
    const nodeInput: NodeInput = {
      id: createNodeId(`managed-policy-${policyName}`),
      parent: null,
      children: [],
      internal: {
        type: `PolicyMetadata`,
        mediaType: `application/json`,
        content: JSON.stringify(content),
        contentDigest: createContentDigest(content)
      }
    };

    const node = Object.assign({}, content, nodeInput);

    createNode(node);
  });

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
        contentDigest: createContentDigest(actionDetail)
      }
    };

    const service = actionDetail.Action.split(':')[0];
    const node = Object.assign({}, actionDetail, { service }, nodeInput);

    createNode(node);
  });

  // Service nodes
  //
  serviceDetailMetadata.forEach(serviceDetail => {
    const nodeInput: NodeInput = {
      id: createNodeId(`service-${serviceDetail.ServiceShortName}`),
      parent: null,
      children: [],
      internal: {
        type: `ServiceMetadata`,
        mediaType: `application/json`,
        content: JSON.stringify(serviceDetail),
        contentDigest: createContentDigest(serviceDetail)
      }
    };

    // Replace JSON blobs with parsed values and make sure they're always arrays
    //
    const Actions = ensureArray(JSON.parse(serviceDetail.Actions));
    const conditionKeys = serviceDetail.conditionKeys
      ? JSON.parse(serviceDetail.conditionKeys)
      : [];
    const context = {
      ...serviceDetail,
      Actions,
      conditionKeys: ensureArray(conditionKeys)
    };
    const node = Object.assign({}, context, nodeInput);

    createNode(node);
  });
};
