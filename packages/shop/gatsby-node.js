const path = require('path')

const getStaticPages = async graphql => {
  return await graphql(
    `
      query StaticPages {
        allShoppingJson {
          edges {
            node {
              id
              title
              price
              dateAdded
              description
            }
          }
        }
      }
    `
  )
}

const createPressHomePage = (allShoppingJson, createPage) => {
  const pressHomePageTemplate = path.resolve(`src/pages/index.js`)

  allShoppingJson.edges.forEach(edge => {
    createPage({
      path: `/`,
      component: pressHomePageTemplate,
      context: {
        data: edge.node,
      },
    })
  })
}

// Implement the Gatsby API “createPages”. This is called once the
// data layer is bootstrapped to let plugins create pages from data.
exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage, createRedirect } = actions
  const result = await getStaticPages(graphql)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query. ${result.errors}`)
    return
  }

  const { allShoppingJson } = result.data
  createPressHomePage(allShoppingJson, createPage)
}
