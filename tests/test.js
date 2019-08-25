import request from 'supertest';
import '@babel/polyfill';

import setup from '../src/app';

const app = setup();

export const graphqlQueryBuilder = (query, variables) => ({
  query,
  variables,
});

it('graphqlQueryBuilder', () => {
  const query = `
    test {
      message
    }
  `;
  const variables = { foo: 'bar' };
  const result = graphqlQueryBuilder(query, variables);
  expect(result).toHaveProperty('query', query);
  expect(result).toHaveProperty('variables.foo', 'bar');
});

export const graphqlTest = (
  query,
  variables,
  statusCode = 200,
  ) => {
  return request(app)
    .post('/graphql')
    .send(graphqlQueryBuilder(query, variables))
    .set('Accept', 'application/json')
    .expect('Content-Type', /json/)
    .expect(statusCode)
};
