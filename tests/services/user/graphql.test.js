import faker from 'faker/locale/pt_BR';

import { graphqlTest } from '../../test';

import { EMAIL_OR_PASSWORD_INCORRECT } from '../../../src/constants';

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
        expect(data.createUser).not.toBeNull();
        expect(data).toHaveProperty('createUser.firstName', variables.firstName);
        expect(data).toHaveProperty('createUser.lastName', variables.lastName);
        expect(data).toHaveProperty('createUser.email', variables.email);
      }).end((err) => {
        if (err) return done(err);
        done();
      });
    });
  });

  const queryAuth = `
    mutation auth(
      $email: String!
      $password: String!
    ) {
      auth(input: { email: $email, password: $password }) {
        token
      }
    }
  `;

  describe('Authenticate', () => {
    it('Should authenticate with valid credentials and retrieve token', (done) => {
      const variables = {
        email: 'testerson@system.com',
        password: process.env.TESTERSON_PASSWORD,
      };
      return graphqlTest(queryAuth, variables).expect(({ body: { data: { auth } } }) => {
        expect(auth).toHaveProperty('token');
        expect(auth.token).not.toBe('');
      }).end((err) => {
        if (err) return done(err);
        done();
      });
    });

    it('Should authenticate with invalid credentials and get an error', (done) => {
      const variables = {
        email: 'testerson@system.com',
        password: 'foo',
      };
      return graphqlTest(queryAuth, variables, 500).expect(({ body: { errors } }) => {
        const error = errors[0];
        expect(error).not.toBeUndefined();
        expect(error).toHaveProperty('message', EMAIL_OR_PASSWORD_INCORRECT);
      }).end((err) => {
        if (err) return done(err);
        done();
      });
    });
  });

  describe('My Data', () => {
    let token = null;
    const variables = {
      email: 'testerson@system.com',
      password: process.env.TESTERSON_PASSWORD,
    };
    beforeAll(async () => {
      const { body: { data: { auth } } } = await graphqlTest(queryAuth, variables);
      token = auth.token;
    });
    it('Should get my user data', (done) => {
      const query = `
        {
          me {
            email
          }
        }
      `;
      return graphqlTest(query)
        .set('Authorization', `Bearer ${token}`)
        .expect(({ body: { data } }) => {
          expect(data.me).not.toBeNull();
          expect(data).toHaveProperty('me.email', variables.email);
        }).end((err) => {
          if (err) return done(err);
          done();
        });
    });
  });
});
