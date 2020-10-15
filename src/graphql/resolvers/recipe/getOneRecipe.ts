import { Args, Query, Resolver, UseMiddleware } from "type-graphql";
import { Recipe } from "../../../models/Recipe";
import { isAuth } from "../../middlewares/isAuth";
import { isLoggedIn } from "../../middlewares/isLogged";
import { idArg } from "../../types/Args";
import { RecipeType } from "../../types/Recipe";

@Resolver()
export class getOneRecipe {
  @Query(() => RecipeType)
  @UseMiddleware(isAuth, isLoggedIn)
  async getOneRecipe(@Args() { id }: idArg) {
    try {
      const recipe = await Recipe.findOne(id, { loadRelationIds: true });
      if (!recipe) throw new Error(`Recipe with id '${id}' not found`);
      return recipe;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
