import DataLoader from 'dataloader';

export const userById = ({ user, db }) => new DataLoader(id => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([{ ...user, db, id }])
    });
  });
});
