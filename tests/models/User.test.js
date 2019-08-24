import 'babel-polyfill';

const { User } = require('../../src/models').default;

describe('CRUD', () => {
  it('should create new user', async () => {
    const payload = {
      first_name: 'foo',
      last_name: 'bar',
      email: 'foobar@example.com',
      year_birth: 1984,
      password_hash: 'secret123',
    };
    const user = await User.create(payload);
    expect(user.first_name).toBe(payload.first_name);
    expect(user.last_name).toBe(payload.last_name);
    expect(user.email).toBe(payload.email);
    expect(user.year_birth).toBe(payload.year_birth);
    expect(user.password_hash).toBe(payload.password_hash);
  });
});
