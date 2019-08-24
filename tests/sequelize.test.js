import '@babel/polyfill';

const { sequelize } = require('../src/models').default;

describe('Sequelize', () => {
  it('Should connect with database', async (done) => {
    sequelize.authenticate().then(() => {
        expect(true).toBeTruthy();
        done();
      }).catch(err => {
        throw new Error(err);
      });
  });
});
