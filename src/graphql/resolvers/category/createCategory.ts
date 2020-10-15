import { Args, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Category } from "../../../models/Category";
import { isAuth } from "../../middlewares/isAuth";
import { isLoggedIn } from "../../middlewares/isLogged";
import { nameArg } from "../../types/Args";
import { CategoryType } from "../../types/Category";

@Resolver()
export class createCategory {
  @Mutation((type) => CategoryType)
  @UseMiddleware(isAuth, isLoggedIn)
  async createCategory(@Args() { name }: nameArg) {
    try {
      const categoryInDatabase = await Category.findOne({
        where: { name }
      });
      if (categoryInDatabase) throw new Error("Category already in database");
      return await Category.create({ name }).save();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
