import request from 'supertest';
import 'babel-polyfill';

import setup from '../../../src/app';

const app = setup();

describe('User', () => {
  it('Should return a token', () => {
    const query = `
      mutation {
        auth(input: { email: "foo@bar.com", password: "secret123" }) {
          token
        }
      }
    `;
    return request(app)
      .post(`/graphql?query=${query.replace(/\s/g, '')}`)
      .expect('Content-Type', /json/)
      .expect(({ body }) => {
        const { auth } = body.data;
        if (!('token' in auth)) throw new Error('missing token');
        expect(auth.token).not.toBe('');
      })
      .expect(200);
  });
});
