import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { Recipe } from '../../../models/Recipe';
import { isAuth } from '../../middlewares/isAuth';
import { isLoggedIn } from '../../middlewares/isLogged';
import { RecipeType } from '../../types/Recipe';

@Resolver()
export class getRecipes {
  @Query(() => [RecipeType])
  @UseMiddleware(isAuth, isLoggedIn)
  async getRecipes() {
    try {
      return await Recipe.find({ loadRelationIds: true });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
