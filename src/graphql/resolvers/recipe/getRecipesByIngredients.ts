import { Args, Query, Resolver, UseMiddleware } from "type-graphql";
import { filterByIngredient } from "../../utils/IngredientsQuery";
import { isAuth } from "../../middlewares/isAuth";
import { isLoggedIn } from "../../middlewares/isLogged";
import { ingredientsArg } from "../../types/Args";
import { RecipeType } from "../../types/Recipe";

@Resolver()
export class getRecipesByIngredients {
  @Query(() => [RecipeType])
  @UseMiddleware(isAuth, isLoggedIn)
  async getRecipesByIngredients(@Args() { ingredients }: ingredientsArg) {
    try {
      return await filterByIngredient(ingredients);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
