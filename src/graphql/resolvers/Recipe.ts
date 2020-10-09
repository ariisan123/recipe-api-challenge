import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { Category } from "../../entity/Category";
import { Recipe } from "../../entity/Recipe";
import { User } from "../../entity/User";
import { filterByIngredient } from "../controllers/IngredientsQuery";
import { isAuth } from "../middlewares/isAuth";
import { isLoggedIn } from "../middlewares/isLogged";
import { MyContext } from "../types/Context";
import { NewRecipeInput, RecipeType, UpdateRecipeInput } from "../types/recipe";
import { UserType } from "../types/User";

@Resolver((of) => RecipeType)
export class RecipeResolver {
  @Query(() => [RecipeType])
  @UseMiddleware(isAuth, isLoggedIn)
  async getMyRecipes(@Ctx() ctx: MyContext) {
    const { userId } = ctx.req.session;
    return await Recipe.find({
      where: { user: userId },
      loadRelationIds: true
    });
  }

  @Query(() => [RecipeType])
  @UseMiddleware(isAuth, isLoggedIn)
  async getRecipes() {
    const recipes = await Recipe.find({ loadRelationIds: true });
    // console.log(recipes);
    return recipes;
  }

  @Query(() => RecipeType)
  @UseMiddleware(isAuth, isLoggedIn)
  async getOneRecipe(@Arg("id") id: string) {
    return await Recipe.findOne(id, { loadRelationIds: true });
  }

  @Query(() => [RecipeType])
  @UseMiddleware(isAuth, isLoggedIn)
  async getRecipesByIngredients(
    @Arg("ingredients", (type) => [String]) ingredients: string[]
  ) {
    console.log(ingredients);
    return await filterByIngredient(ingredients!);
  }

  @Mutation(() => RecipeType)
  @UseMiddleware(isAuth, isLoggedIn)
  async createRecipe(
    @Arg("recipeObj") recipeObj: NewRecipeInput,
    @Ctx() context: MyContext
  ) {
    const { userId } = context.req.session;
    return await Recipe.create({ ...recipeObj, user: userId }).save();
  }

  @Mutation(() => RecipeType)
  @UseMiddleware(isAuth, isLoggedIn)
  async deleteRecipe(@Arg("id") id: string) {
    const recipe = await Recipe.findOne({ where: { id } });
    console.log(recipe);
    const result = await Recipe.softRemove(recipe);
    console.log(result);
    return result;
  }

  @Mutation(() => RecipeType)
  @UseMiddleware(isAuth, isLoggedIn)
  async updateRecipe(
    @Arg("recipe") recipe: UpdateRecipeInput,
    @Ctx() context: MyContext
  ) {
    const exist = await Recipe.findOne({
      where: { user: context.req.session.userId, id: recipe.id }
    });
    if (!exist) throw new Error("Recipe not found");
    const result = await Recipe.save(recipe as any);
    console.log(result);
    return result;
  }

  @FieldResolver(() => UserType)
  async user(@Root() recipe: Recipe, @Ctx() ctx: MyContext) {
    /* const result = await User.findOne({
      where: { id: recipe.user },
      loadRelationIds: true
    }); */
    const result = await ctx.userLoader.load(recipe.user as string);

    return result;
  }

  @FieldResolver(() => UserType)
  async category(@Root() recipe: Recipe, @Ctx() ctx: MyContext) {
    /* const result = await Category.findOne({
      where: { id: recipe.category },
      loadRelationIds: true
    }); */
    const result = await ctx.categoryLoader.load(recipe.category as string);

    return result;
  }
}
