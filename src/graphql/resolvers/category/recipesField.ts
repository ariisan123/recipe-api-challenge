import { FieldResolver, Resolver, Root } from 'type-graphql';
import { Category } from '../../../models/Category';
import { Recipe } from '../../../models/Recipe';
import { CategoryType } from '../../types/Category';
import { RecipeType } from '../../types/Recipe';

@Resolver((of) => CategoryType)
export class categoryRecipesField {
  @FieldResolver(() => [RecipeType], { nullable: true })
  async recipes(@Root() category: Category) {
    try {
      return await Recipe.find({
        where: { category: category.id },
        loadRelationIds: true
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
