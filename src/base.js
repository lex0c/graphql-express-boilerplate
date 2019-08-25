import { makeExecutableSchema } from 'graphql-tools';
import { GraphQLUpload } from 'graphql-upload'
import { merge } from 'lodash';

import services from './services';

const schemaBase = `
  type Query {
    test: String
  }
  type Mutation {
    _empty(id: ID): String
  }
  scalar Upload
  scalar Date
`;

const resolversBase = {
  Query: { test: () => 'ok' },
  Mutation: { _empty: () => '' },
  Upload: GraphQLUpload,
};

export const typeDefs = schemaBase.concat(services.schemas).replace(/,/g, '');
export const resolvers = merge(resolversBase, services.resolvers);
export default makeExecutableSchema({ typeDefs, resolvers });
