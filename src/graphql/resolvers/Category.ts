import {
  Arg,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { Category } from "../../entity/Category";
import { Recipe } from "../../entity/Recipe";
import { categoryExist } from "../middlewares/CategoryExist";
import { isAuth } from "../middlewares/isAuth";
import { isLoggedIn } from "../middlewares/isLogged";
import {
  CategoryType,
  findCategoryInput,
  UpdateCategoryInput
} from "../types/Category";
import { RecipeType } from "../types/recipe";

@Resolver((of) => CategoryType)
export class CategoryResolver {
  @Query((type) => [CategoryType])
  @UseMiddleware(isAuth, isLoggedIn)
  async getCategories() {
    return await Category.find({ loadRelationIds: true });
  }

  @Query((type) => CategoryType)
  @UseMiddleware(isAuth, isLoggedIn)
  async getOneCategory(@Arg("categoryObj") categoryObj: findCategoryInput) {
    const entries = Object.entries(categoryObj) || null;
    console.log(entries);
    if (entries.length === 2 || !entries)
      throw new Error("Please send ID or NAME");

    let [[key, value]] = entries;
    value = value.trim();

    return await Category.findOne({
      where: { [key]: value }
    });
  }

  @Mutation((type) => CategoryType)
  @UseMiddleware(isAuth, isLoggedIn, categoryExist)
  async createCategory(@Arg("category") category: string) {
    return await Category.create({ name: category }).save();
  }

  @Mutation((type) => CategoryType)
  @UseMiddleware(isAuth, isLoggedIn)
  async updateCategory(@Arg("category") category: UpdateCategoryInput) {
    const exist = await Category.findOne(category.id);
    if (!exist) throw new Error("Category not found.");
    const result = await Category.save(category as any);
    console.log(result);
    return result;
  }

  @Mutation(() => String)
  @UseMiddleware(isAuth, isLoggedIn)
  async deleteCategory(@Arg("id") id: string) {
    console.log(id);
    const category = await Category.findOne({ where: { id } });
    console.log(category);
    category ? await Category.softRemove(category) : null;
    return "askdjf";
  }

  @FieldResolver(() => [RecipeType])
  async recipes(@Root() category: Category) {
    return await Recipe.find({
      where: { category: category.id },
      loadRelationIds: true
    });
  }
}
