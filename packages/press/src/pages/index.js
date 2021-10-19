import React from 'react'

import { graphql } from 'gatsby';

const IndexPage = ({ data }) => {
  const edges = data.allShoppingJson.edges

  return (
    <div>
      <h1>Press pages</h1>
      {edges &&
        edges.map(edge => <h1 key={edge.node.id}>{edge.node.title}</h1>)}
    </div>
  )
}

export default IndexPage

export const query = graphql`
  query ShoppingPageQuery {
    allShoppingJson {
      edges {
        node {
          id
          title
        }
      }
    }
  }
`
