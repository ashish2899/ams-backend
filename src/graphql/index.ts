import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloGraphqlServer() {
  const graphql = new ApolloServer({
    typeDefs: `
      ${User.typeDefs}
        type Query{
            ${User.queries}
        }
        type Mutation{
            ${User.mutations}
        }
    `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
  });
  await graphql.start();

  return graphql;
}

export default createApolloGraphqlServer;
