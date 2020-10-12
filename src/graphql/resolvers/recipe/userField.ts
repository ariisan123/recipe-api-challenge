import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Recipe } from '../../../models/Recipe';
import { MyContext } from '../../types/Context';
import { RecipeType } from '../../types/Recipe';
import { UserType } from '../../types/User';

@Resolver((of) => RecipeType)
export class recipesUserField {
  @FieldResolver(() => UserType)
  async user(@Root() recipe: Recipe, @Ctx() ctx: MyContext) {
    try {
      return await ctx.userLoader.load(recipe.user as string);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
