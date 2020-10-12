import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Recipe } from '../../../models/Recipe';
import { isAuth } from '../../middlewares/isAuth';
import { isLoggedIn } from '../../middlewares/isLogged';
import { MyContext } from '../../types/Context';
import { NewRecipeInput, RecipeType } from '../../types/Recipe';

@Resolver()
export class createRecipe {
  @Mutation(() => RecipeType)
  @UseMiddleware(isAuth, isLoggedIn)
  async createRecipe(
    @Arg('recipeObj') recipeObj: NewRecipeInput,
    @Ctx() context: MyContext
  ) {
    try {
      const { userId } = context.req.session;
      return await Recipe.create({ ...recipeObj, user: userId }).save();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
