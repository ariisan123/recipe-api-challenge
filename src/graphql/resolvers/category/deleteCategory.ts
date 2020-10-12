import { Arg, Mutation, Resolver, UseMiddleware } from 'type-graphql';
import { Category } from '../../../models/Category';
import { isAuth } from '../../middlewares/isAuth';
import { isLoggedIn } from '../../middlewares/isLogged';
import { CategoryType } from '../../types/Category';

@Resolver()
export class deleteCategory {
  @Mutation(() => CategoryType)
  @UseMiddleware(isAuth, isLoggedIn)
  async deleteCategory(@Arg('id') id: string) {
    try {
      const category = await Category.findOne({ where: { id } });
      if (!category) throw new Error('Category not found');
      const result = await Category.softRemove(category);
      console.log(result);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
