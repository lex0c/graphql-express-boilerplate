import express from 'express';
import graphqlHTTP from 'express-graphql';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import moment from 'moment';

import cluster from './utils/cluster';
import { getUserByToken, extractToken } from './utils/auth';

import schema from './base';

import { PROD, TOKEN_HEADER_NAME } from './constants';

const isProductionMode = process.env.NODE_ENV === PROD;

const setup = () => {
  const app = express();

  app.use(helmet());
  app.use(cors());

  app.use('/graphql', graphqlHTTP(req => ({
    schema,
    context: {
      isProductionMode,
      dbInstance: null,
      auth: {
        user: getUserByToken(req.headers[TOKEN_HEADER_NAME]),
        token: extractToken(req.headers[TOKEN_HEADER_NAME]),
      },
      startTime: moment().milliseconds(),
    },
    extensions: ({ context }) => {
      return {
        queryTimeMeasurement: moment().milliseconds() - context.startTime,
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

  app.use(bodyParser.text({ extended: true }));

  const port = process.env.PORT || 4000;

  app.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}/graphql`);
  });
}

if (isProductionMode) cluster(setup);
else setup();
