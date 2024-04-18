const _ = require(`lodash`);
const path = require(`path`);
const { slash } = require(`gatsby-core-utils`);
const slug = require('slug');

const actionDetailPageTemplate = path.resolve(
  `src/templates/action-detail-page.tsx`
);
const serviceDetailPageTemplate = path.resolve(
  `src/templates/service-detail-page.tsx`
);
const policyDetailPageTemplate = path.resolve(
  `src/templates/policy-detail-page.tsx`
);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const policyQueryResult = await graphql(`
  {
    allPolicyMetadata {
      distinct(field: {policy: {PolicyName: SELECT}})
    }
  }
  `);

  // Managed policy detail pages
  //
  policyQueryResult.data.allPolicyMetadata.distinct.forEach(
    (PolicyName: string) => {
      createPage({
        path: `/${PolicyName}/`,
        component: slash(policyDetailPageTemplate),
        context: {
          PolicyName
        }
      });
    }
  );

  // Service detail pages
  //
  const serviceDetailQueryResult = await graphql(`
    {
      allPolicyMetadata {
        distinct(field: {services: SELECT})
      }
    }
  `);

  serviceDetailQueryResult.data.allPolicyMetadata.distinct.forEach(
    (service: string) => {
      createPage({
        path: `/service/${service}/`,
        component: slash(serviceDetailPageTemplate),
        context: {
          service
        }
      });
    }
  );

  const actionDetailQueryResult = await graphql(`
    {
      allActionMetadata {
        nodes {
          Action
        }
      }
    }
  `);

  // Action detail page
  //
  const actionNodes = actionDetailQueryResult.data.allActionMetadata.nodes;

  actionNodes.forEach(node => {
    const Action = node.Action;

    createPage({
      path: `/action/${node.Action}/`,
      component: slash(actionDetailPageTemplate),
      context: {
        Action
      }
    });
  });
};
