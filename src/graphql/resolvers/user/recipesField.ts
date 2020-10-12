import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Recipe } from '../../../models/Recipe';
import { User } from '../../../models/User';
import { RecipeType } from '../../types/Recipe';
import { UserType } from '../../types/User';

@Resolver((of) => UserType)
export class userRecipesField {
  @FieldResolver(() => [RecipeType], { nullable: true })
  async recipes(@Root() user: User) {
    try {
      return await Recipe.find({
        where: { user: user.id },
        loadRelationIds: true
      });
      // const result = await ctx.categoryLoader.load(user.recipe as string);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
