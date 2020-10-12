import { Arg, Query, Resolver, UseMiddleware } from 'type-graphql';
import { Recipe } from '../../../models/Recipe';
import { isAuth } from '../../middlewares/isAuth';
import { isLoggedIn } from '../../middlewares/isLogged';
import { RecipeType } from '../../types/Recipe';

@Resolver()
export class getOneRecipe {
  @Query(() => RecipeType)
  @UseMiddleware(isAuth, isLoggedIn)
  async getOneRecipe(@Arg('id') id: string) {
    try {
      const recipe = await Recipe.findOne(id, { loadRelationIds: true });
      if (!recipe) throw new Error(`Recipe with id '${id}' doesn't exists`);
      return recipe;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
