import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import moment from 'moment';

import { ENV_PROD, ENV_TEST, TOKEN_HEADER_NAME } from './constants';

require('dotenv').config({
  path: process.env.NODE_ENV !== ENV_TEST ? '.env' : '.env.test',
  debug: process.env.DEBUG || false,
});

import { getUserByToken, extractToken } from './utils/auth';

import schema from './base';

export const isProductionMode = process.env.NODE_ENV === ENV_PROD;

export default () => {
  const app = express();

  app.use(helmet());

  app.use(bodyParser.json({ limit: '10mb', extended: true }));

  app.use(cors({
    origin: '*', // TODO: set your origin!
    methods: 'GET,POST',
    optionsSuccessStatus: 200,
  }));

  app.use('/graphql', graphqlHTTP(req => ({
    schema,
    context: {
      isProductionMode,
      dbInstance: null, // TODO: configure DB and pass the instance here!
      auth: {
        user: getUserByToken(req.headers[TOKEN_HEADER_NAME]),
        token: extractToken(req.headers[TOKEN_HEADER_NAME]),
      },
      startTime: moment().milliseconds(),
    },
    extensions: ({ context }) => {
      return {
        queryTimeMeasurement: (moment().milliseconds() - context.startTime),
      };
    },
    customFormatErrorFn: err => {
      const data = {
        message: err.message,
        locations: err.locations,
        stack: err.stack ? err.stack.split('\n') : [],
        path: err.path,
      };
      if (!isProductionMode) return data;
      return err.message;
    },
    graphiql: !isProductionMode,
  })));

  return app;
};
