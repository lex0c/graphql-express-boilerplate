import request from 'supertest';
import 'babel-polyfill';

import setup from '../src/app';

const app = setup();

describe('Graphql Server', () => {
  it('Should response the GET with success', () => {
    return request(app)
      .get('/graphql?query={test}')
      .expect('Content-Type', /json/)
      .expect(({ body }) => {
        if (!('test' in body.data)) throw new Error('missing test');
        if (body.data.test !== 'ok') throw new Error('query "test" not retrieve "ok" value');
      })
      .expect(200);
  });
});
