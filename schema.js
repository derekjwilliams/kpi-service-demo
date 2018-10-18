const { gql } = require('apollo-server');

export const typeDefs = gql`
  interface Node {
    id: ID!
  }
  # This "Trend" type can be used in other type declarations.
  type Trend {
    _id: ID!
    metric: String
    value: Float
  }
  type OSAT {
    _id: ID!
    month: String
    value: Float
  }
  type KPI {
    trends: [Trend]
    osats: [OSAT]
  }
  type PageInfo {
    startCursor: String
    endCursor: String
    hasNextPage: Boolean
  }
  type KPITrendsConnection {
    pageInfo: PageInfo!
    edges: [KPITrendsEdge]
  }
  type KPITrendsEdge {
    cursor: String!
    node: Trend
  }

  extend type Trend implements Node {
    id: ID!
  }
  extend type OSAT implements Node {
    id: ID!
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    kpi: KPI
    trends: [Trend]
  }
`;
