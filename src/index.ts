import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './graphql/resolvers/user';
import '../dotenv.config';

const app = express();

const main = async () => {
  await createConnection();
  console.log('DB Connected');
  const schema = await buildSchema({ resolvers: [UserResolver] });
  const server = new ApolloServer({
    schema,
    context: ({ req, res }) => ({ req, res }),
    playground: true,
    introspection: true
  });
  server.applyMiddleware({ app, path: '/recipes-challenge' });

  app.listen(process.env.SV_PORT, () =>
    console.log(`Server Connected on PORT ${process.env.SV_PORT}`)
  );
};

main();
