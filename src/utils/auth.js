import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { addHours, getTime } from 'date-fns';

import { UNAUTHORIZED, TOKEN_EXPIRED } from '../constants';

export const encode = payload => jwt.sign({
  exp: getTime(addHours(new Date(), 1)),
  user: payload
}, process.env.APP_SECRET_KEY);

export const decode = token => jwt.verify(token, process.env.APP_SECRET_KEY);

export const checkAuthorization = ({ user, token }) => {
  if (!user) throw new Error(UNAUTHORIZED);
  if (new Date() > new Date(decode(token).exp)) throw new Error(TOKEN_EXPIRED);
};

export const getUserByToken = token => token && decode(extractToken(token)).user;

export const extractToken = rawToken => {
  const token = rawToken && rawToken.split(' ')[1];
  return token && token.trim();
};

export const generateHash = (plainPassword) => {
  return bcrypt.hash(plainPassword, parseInt(12, 10));
};
