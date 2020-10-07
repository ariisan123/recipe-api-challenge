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
import { Raw } from "typeorm";
import { Recipe } from "../../entity/Recipe";
import { User } from "../../entity/User";
import { filterByIngredient } from "../controllers/IngredientsQuery";
import { isAuth } from "../middlewares/isAuth";
import { MyContext } from "../types/Context";
import { NewRecipeInput, RecipeType } from "../types/recipe";
import { UserType } from "../types/User";

@Resolver((of) => RecipeType)
export class RecipeResolver {
  @Query(() => [RecipeType])
  @UseMiddleware(isAuth)
  async getMyRecipes(@Ctx() ctx: MyContext) {
    const { userId } = ctx.req.session;
    return await Recipe.find({
      where: { user: userId },
      loadRelationIds: true
    });
  }

  @Query(() => [RecipeType])
  // @UseMiddleware(isAuth)
  async getRecipes() {
    const recipes = await Recipe.find({ loadRelationIds: true });
    // console.log(recipes);
    return recipes;
  }

  @Query(() => [RecipeType])
  // @UseMiddleware(isAuth)
  async getRecipesByIngredients(
    @Arg("ingredients", (type) => [String]) ingredients: string[]
  ) {
    console.log(ingredients);
    return await filterByIngredient(ingredients!);
  }

  @Mutation(() => RecipeType)
  @UseMiddleware(isAuth)
  async createRecipe(
    @Arg("recipeObj") recipeObj: NewRecipeInput,
    @Ctx() context: MyContext
  ) {
    const { userId } = context.req.session;
    return await Recipe.create({ ...recipeObj!, user: userId }).save();
  }

  @FieldResolver(() => UserType)
  async user(@Root() recipe: Recipe) {
    const result = await User.findOne({
      where: { id: recipe.user },
      loadRelationIds: true
    });
    return result;
  }
}
