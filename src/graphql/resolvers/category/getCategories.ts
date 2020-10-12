import { Query, Resolver, UseMiddleware } from 'type-graphql';
import { Category } from '../../../models/Category';
import { isAuth } from '../../middlewares/isAuth';
import { isLoggedIn } from '../../middlewares/isLogged';
import { CategoryType } from '../../types/Category';

@Resolver()
export class getCategories {
  @Query((type) => [CategoryType])
  @UseMiddleware(isAuth, isLoggedIn)
  async getCategories() {
    try {
      return await Category.find({ loadRelationIds: true });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
