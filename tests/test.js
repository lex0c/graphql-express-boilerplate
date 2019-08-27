import request from 'supertest';
import '@babel/polyfill';

import setup from '../src/app';

const app = setup();

export const makeGraphqlQuery = (query, variables) => ({
  query,
  variables,
});

export const graphqlTest = (
  query,
  variables,
  statusCode = 200,
  ) => {
  return request(app)
    .post('/graphql')
    .send(makeGraphqlQuery(query, variables))
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(statusCode)
};
