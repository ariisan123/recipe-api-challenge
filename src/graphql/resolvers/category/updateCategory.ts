import { Mutation, UseMiddleware, Arg, Resolver } from 'type-graphql';
import { Category } from '../../../models/Category';
import { isAuth } from '../../middlewares/isAuth';
import { isLoggedIn } from '../../middlewares/isLogged';
import { CategoryType, UpdateCategoryInput } from '../../types/Category';

@Resolver()
export class updateCategory {
  @Mutation((type) => CategoryType)
  @UseMiddleware(isAuth, isLoggedIn)
  async updateCategory(@Arg('category') category: UpdateCategoryInput) {
    try {
      const exist = await Category.findOne(category.id);
      if (!exist) throw new Error('Category not found.');
      return await Category.save(category as any);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
