import { Arg, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Recipe } from "../../../models/Recipe";
import { isAuth } from "../../middlewares/isAuth";
import { isLoggedIn } from "../../middlewares/isLogged";
import { MyContext } from "../../types/Context";
import { RecipeType, UpdateRecipeInput } from "../../types/Recipe";

@Resolver()
export class updateRecipe {
  @Mutation(() => RecipeType)
  @UseMiddleware(isAuth, isLoggedIn)
  async updateRecipe(
    @Arg("recipe") recipe: UpdateRecipeInput,
    @Ctx() ctx: MyContext
  ) {
    try {
      const { userId } = ctx.req.session;
      const exist = await Recipe.findOne({
        where: { user: userId, id: recipe.id },
        loadRelationIds: true
      });
      if (!exist) throw new Error("Recipe not found");
      const updatedRecipe: Recipe = await Recipe.save({
        ...exist,
        ...(recipe as any)
      });
      return updatedRecipe;
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
