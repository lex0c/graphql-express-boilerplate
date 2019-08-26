import DataLoader from 'dataloader';

export const getUsersLoader = ({ sequelize }) => new DataLoader(() => {
  return Promise.all([sequelize.User.findAll()]);
});
