import { Ctx, FieldResolver, Resolver, Root } from 'type-graphql';
import { Recipe } from '../../../models/Recipe';
import { MyContext } from '../../types/Context';
import { RecipeType } from '../../types/Recipe';
import { UserType } from '../../types/User';

@Resolver((of) => RecipeType)
export class recipesCategoryField {
  @FieldResolver(() => UserType)
  async category(@Root() recipe: Recipe, @Ctx() ctx: MyContext) {
    try {
      const categoryId = recipe.category;
      if (!categoryId) return;

      console.log(categoryId);
      return await ctx.categoryLoader.load(categoryId as string);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
