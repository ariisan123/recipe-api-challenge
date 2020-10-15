import { Arg, Query, Resolver, UseMiddleware } from "type-graphql";
import { Category } from "../../../models/Category";
import { isAuth } from "../../middlewares/isAuth";
import { isLoggedIn } from "../../middlewares/isLogged";
import { CategoryType, findCategoryInput } from "../../types/Category";

@Resolver()
export class getOneCategory {
  @Query((type) => CategoryType)
  @UseMiddleware(isAuth, isLoggedIn)
  async getOneCategory(@Arg("categoryObj") categoryObj: findCategoryInput) {
    try {
      const entries = Object.entries(categoryObj) || null;
      if (entries.length === 2 || !entries)
        throw new Error("Please send ID or NAME");

      let [[key, value]] = entries;
      value = value.trim();

      const category = await Category.findOne({
        where: { [key]: value }
      });

      if (!category)
        throw new Error(`Category with ${key} of '${value}' doesn't exists`);
      return category;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
