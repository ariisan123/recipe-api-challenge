import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { ForeignKeyMetadata } from "typeorm/metadata/ForeignKeyMetadata";
import { Category } from "../../entity/Category";
import { Recipe } from "../../entity/Recipe";
import { categoryExist } from "../middlewares/CategoryExist";
import { isAuth } from "../middlewares/isAuth";
import { CategoryType, findCategoryInput } from "../types/Category";
import { RecipeType } from "../types/recipe";

@Resolver((of) => CategoryType)
export class CategoryResolver {
  @Query((type) => [CategoryType])
  async getCategories() {
    return await Category.find({ loadRelationIds: true });
  }

  @Query((type) => CategoryType)
  async getOneCategory(@Arg("categoryObj") categoryObj: findCategoryInput) {
    const entries = Object.entries(categoryObj);
    console.log(entries);
    if (entries.length === 2) throw new Error("Please send ID or NAME");

    let [[key, value]] = entries;
    value = value.trim();

    return await Category.findOne({
      where: { [key]: value }
    });
  }

  @Mutation((type) => CategoryType)
  @UseMiddleware(isAuth, categoryExist)
  async createCategory(@Arg("category") category: string) {
    return await Category.create({ name: category }).save();
  }

  @FieldResolver(() => [RecipeType])
  async recipes(@Root() category: Category) {
    return await Recipe.find({
      where: { category: category.id },
      loadRelationIds: true
    });
  }
}
