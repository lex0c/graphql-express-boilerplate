import Controller from './controller';
import { checkAuthorization } from '../../utils/auth';

export const schemas = `
  extend type Query {
    me: User!
  }
  extend type Mutation {
    auth(input: AuthInput!): AuthData!
    createUser(input: CreateUserInput!): User
  }
  input AuthInput {
    email: String!
    password: String!
  }
  input CreateUserInput {
    firstName: String!
    lastName: String!
    email: String!
    password: String!
  }
  type AuthData {
    token: String!
  }
  type User {
    id: ID!
    firstName: String
    lastName: String
    email: String
    createdAt: Date
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
    createUser: (_, args, context) => {
      return Controller.createUser(args, context);
    },
  },
};

export default {
  schemas, resolvers,
};
