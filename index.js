const { ApolloServer, gql } = require('apollo-server');

// This is a (sample) collection of trends we'll be able to query
// the GraphQL server for.  A more complete example might fetch
// from an existing data source like a REST API or database.
const trends = [
  {
    metric: 'Phone Experience',
    value: 50,
  },
  {
    metric: 'Agent',
    value: 10,
  },
  {
    metric: 'TicketHandling',
    value: 40,
  },
  {
    metric: 'Overall Experience',
    value: 89,
  },
  {
    metric: 'Response Time',
    value: 85.4,
  },
  {
    metric: 'Online & Systems',
    value: 15,
  },
];
const osats = [
  {
    month: 'March',
    value: 79.3,
  },
  {
    month: 'April',
    value: 71.4,
  },
  {
    month: 'May',
    value: 68.6,
  },
  {
    month: 'June',
    value: 75,
  },
  {
    month: 'July',
    value: 63.4,
  },
  {
    month: 'August',
    value: 74,
  },
]

const kpi = {
  trends: trends,
  osats: osats,
}
// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
  # This "Trend" type can be used in other type declarations.
  type Trend {
    metric: String
    value: Float
  }
  type OSAT {
    month: String
    value: Float
  }
  type KPI {
    trends: [Trend]
    osats: [OSAT]
  }

  # The "Query" type is the root of all GraphQL queries.
  # (A "Mutation" type will be covered later on.)
  type Query {
    kpi: KPI
    trends: [Trend]
  }
`;

// Resolvers define the technique for fetching the types in the
// schema.  We'll retrieve kpi from the "trends" array above.
const resolvers = {
  Query: {
    kpi: () => {
      console.log('kpi')
      return kpi
    },
    trends: () => {
      console.log('trends')
      return trends
    },
  },
};

// In the most basic sense, the ApolloServer can be started
// by passing type definitions (typeDefs) and the resolvers
// responsible for fetching the data for those types.
const server = new ApolloServer({ typeDefs, resolvers });

// This `listen` method launches a web-server.  Existing apps
// can utilize middleware options, which we'll discuss later.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});