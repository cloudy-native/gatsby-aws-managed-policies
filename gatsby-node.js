"use strict"

require("source-map-support").install()
require("ts-node").register({
  compilerOptions: {
    module: "commonjs",
    target: "es2020",
  },
})

exports.createPages = require('./src/gatsby-api/create-pages').createPages
exports.sourceNodes = require("./src/gatsby-api/source-nodes").sourceNodes

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    node: {
      fs: 'empty'
    }
  })
}
