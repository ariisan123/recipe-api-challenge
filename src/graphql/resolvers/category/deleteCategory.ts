import { Args, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Category } from "../../../models/Category";
import { isAuth } from "../../middlewares/isAuth";
import { isLoggedIn } from "../../middlewares/isLogged";
import { idArg } from "../../types/Args";
import { CategoryType } from "../../types/Category";

@Resolver()
export class deleteCategory {
  @Mutation(() => CategoryType)
  @UseMiddleware(isAuth, isLoggedIn)
  async deleteCategory(@Args() { id }: idArg) {
    try {
      const category = await Category.findOne(id);
      if (!category) throw new Error("Category not found");
      const result = await Category.softRemove(category);
      return result;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
