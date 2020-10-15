import "reflect-metadata";
import "../dotenv.config";
import * as express from "express";
import * as session from "express-session";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server-express";
import { getSchema } from "./graphql/schema";
import { userLoader } from "./graphql/loaders/userLoader";
import { categoryLoader } from "./graphql/loaders/categoryLoader";

const main = async () => {
  try {
    await createConnection();
    console.log("DB Connected");

    const schema = await getSchema();
    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({
        req,
        res,
        userLoader: userLoader(),
        categoryLoader: categoryLoader()
      }),
      playground: {
        settings: {
          "request.credentials": "include"
        }
      },
      introspection: true,
      debug: true
    });

    const app = express();
    app.use(
      session({
        secret: process.env.SECRET,
        saveUninitialized: false,
        resave: false,
        cookie: {
          secure: false,
          maxAge: 1000 * 60 * 60 * 24 * 7 * 365
        }
      })
    );

    server.applyMiddleware({ app, path: "/recipes-challenge" });

    app.listen(process.env.PORT, () =>
      console.log(`
      Server Connected on PORT ${process.env.SV_PORT}
      http://localhost:${process.env.PORT}/recipes-challenge
      `)
    );
  } catch (err) {
    console.log(err);
    return err;
  }
};

main();
