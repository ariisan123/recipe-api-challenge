import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { filterByIngredient } from '../../controllers/IngredientsQuery';
import { isAuth } from '../../middlewares/isAuth';
import { isLoggedIn } from '../../middlewares/isLogged';
import { RecipeType } from '../../types/Recipe';

@Resolver()
export class getRecipesByIngredients {
  @Query(() => [RecipeType])
  @UseMiddleware(isAuth, isLoggedIn)
  async getRecipesByIngredients(
    @Arg('ingredients', (type) => [String]) ingredients: string[]
  ) {
    try {
      console.log(ingredients);
      return await filterByIngredient(ingredients);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
