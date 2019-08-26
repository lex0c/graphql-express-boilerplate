import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import moment from 'moment';

import { UNAUTHORIZED, TOKEN_EXPIRED } from '../constants';

export const encode = payload => jwt.sign({
  exp: moment().add(1, 'H').valueOf(),
  user: payload
}, process.env.APP_SECRET_KEY);

export const decode = token => jwt.verify(token, process.env.APP_SECRET_KEY);

export const checkAuthorization = ({ user, token }) => {
  if (!user) throw new Error(UNAUTHORIZED);
  if (moment() > moment(decode(token).exp)) throw new Error(TOKEN_EXPIRED);
};

export const getUserByToken = token => token && decode(extractToken(token)).user;

export const extractToken = rawToken => {
  const token = rawToken && rawToken.split(' ')[1];
  return token && token.trim();
};

export const generatePasswordHash = (plainPassword) => {
  const saltRounds = parseInt(process.env.SALT_ROUNDS, 10);
  return bcrypt.hash(plainPassword, saltRounds);
};
