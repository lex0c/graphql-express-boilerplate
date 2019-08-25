var jwt = require('jsonwebtoken');

export const encode = payload => jwt.sign({
  exp: Math.floor(Date.now() / 1000) + (60 * 60),
  user: payload
}, process.env.APP_SECRET_KEY);

export const decode = token => jwt.verify(token, process.env.APP_SECRET_KEY);

export const checkAuthorization = user => {
  if (!user) throw new Error('unauthorized');
};

export const getUserByToken = token => token && decode(extractToken(token));

export const extractToken = rawToken => {
  const token = rawToken && rawToken.split(' ')[1];
  return token && token.trim();
};
