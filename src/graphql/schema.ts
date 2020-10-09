import { buildSchema } from "type-graphql";
import { CategoryResolver } from "./resolvers/Category";
import { RecipeResolver } from "./resolvers/Recipe";
import { UserResolver } from "./resolvers/User";

export async function getSchema() {
  try {
    return await buildSchema({
      resolvers: [UserResolver, RecipeResolver, CategoryResolver]
    });
  } catch (err) {
    return err;
  }
}
