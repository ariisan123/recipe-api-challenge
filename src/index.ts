import "reflect-metadata";
import { createConnection } from "typeorm";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { UserResolver } from "./graphql/resolvers/User";
import "../dotenv.config";
import { RecipeResolver } from "./graphql/resolvers/Recipe";
import * as session from "express-session";
import { CategoryResolver } from "./graphql/resolvers/Category";

const main = async () => {
  try {
    await createConnection();
    console.log("DB Connected");
    const schema = await buildSchema({
      resolvers: [UserResolver, RecipeResolver, CategoryResolver]
    });

    const server = new ApolloServer({
      schema,
      context: ({ req, res }) => ({ req, res }),
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

    app.listen(process.env.SV_PORT, () =>
      console.log(`Server Connected on PORT ${process.env.SV_PORT}`)
    );
  } catch (err) {
    console.log(err);
    return err;
  }
};

main();
