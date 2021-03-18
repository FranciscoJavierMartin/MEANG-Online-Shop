import express from 'express';
import cors from 'cors';
import compression from 'compression';
import { ApolloServer } from 'apollo-server-express';
import { createServer } from 'http';
import expressPlayground from 'graphql-playground-middleware-express';
import environments from './config/environments';
import schema from './schema';
import Database from './lib/database';
import { IContext } from './interfaces/context.interface';

if (process.env.NODE_ENV !== 'production') {
  const env = environments;
}

async function init() {
  const app = express();

  app.use(cors());
  app.use(compression());

  const database = new Database();

  const db = await database.init();

  const context = async ({ req, connection }: IContext) => {
    const token = req ? req.headers.authorization : connection.authorization;
    return { db, token };
  };

  const server = new ApolloServer({
    schema,
    introspection: true,
    context,
  });

  server.applyMiddleware({ app });

  app.get(
    '/',
    expressPlayground({
      endpoint: '/graphql',
    })
  );

  const httpServer = createServer(app);
  const PORT = process.env.PORT;

  httpServer.listen(
    {
      port: PORT,
    },
    () => {
      console.log(`Running on http://localhost:${PORT}`);
    }
  );
}

init();
