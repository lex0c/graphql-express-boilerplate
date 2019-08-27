import '@babel/polyfill';

import { graphqlTest } from './test';

describe('Graphql Server', () => {
  it('Should success', () => {
    return graphqlTest('{test}')
      .expect(({ body }) => {
        const { data, extensions } = body;
        expect(data).toHaveProperty('test', 'ok');
        expect(extensions).toHaveProperty('queryTimeMeasurement');
      })
  });
});
