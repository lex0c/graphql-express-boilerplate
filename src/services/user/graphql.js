import Controller from './controller';
import { checkAuthorization } from '../../utils/auth';

export const schemas = `
  extend type Query {
    me: User!
  }
  extend type Mutation {
    auth(input: AuthInput): AuthData!
  }
  input AuthInput {
    email: String!
    password: String!
  }
  type AuthData {
    token: String!
  }
  type User {
    id: ID!
    email: String
  }
`;

export const resolvers = {
  Query: {
    me: (_, args, context) => {
      checkAuthorization(context.auth.user);
      return { id: 1, email: 'foo@mail.com' };
    },
  },
  Mutation: {
    auth: (_, args, context) => {
      return Controller.authenticate(args, context);
    },
  },
};

export default {
  schemas, resolvers,
};
