import faker from 'faker/locale/pt_BR';

import { graphqlTest } from '../../test';

describe('User Service', () => {
  describe('CRUD', () => {
    it('Should create new user', (done) => {
      const query = `
        mutation createUser(
          $firstName: String!
          $lastName: String!
          $email: String!
          $password: String!
        ) {
          createUser(input: {
            firstName: $firstName,
            lastName: $lastName,
            email: $email,
            password: $password
          }) {
            id
            firstName
            lastName
            email
          }
        }
      `;
      const variables = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        password: faker.random.words(3).replace(/\s/g, ''),
      };
      return graphqlTest(query, variables).expect(({ body: { data } }) => {
        expect(data).toHaveProperty('createUser.id', 1);
        expect(data).toHaveProperty('createUser.firstName', variables.firstName);
        expect(data).toHaveProperty('createUser.lastName', variables.lastName);
        expect(data).toHaveProperty('createUser.email', variables.email);
      }).end((err) => {
        if (err) return done(err);
        done();
      });
    });
  });
  describe('Authenticate', () => {
    it('Should return a token', (done) => {
      const query = `
        mutation {
          auth(input: { email: "foo@bar.com", password: "secret123" }) {
            token
          }
        }
      `;
      return graphqlTest(query).expect(({ body }) => {
        const { auth } = body.data;
        if (!('token' in auth)) throw new Error('missing token');
        expect(auth.token).not.toBe('');
      }).end((err) => {
        if (err) return done(err);
        done();
      });
    });
  });
});
