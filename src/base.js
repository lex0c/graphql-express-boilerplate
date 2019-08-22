import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';

import services from './services';

const schemaBase = `
  type Query {
    _empty: String
  }
  type Mutation {
    _empty(id: ID): String
  }
`;

const resolversBase = {
  Query: { _empty: () => '' },
  Mutation: { _empty: () => '' },
};

export const typeDefs = schemaBase.concat(services.schemas).replace(/,/g, '');
export const resolvers = merge(resolversBase, services.resolvers);
export default makeExecutableSchema({ typeDefs, resolvers });
