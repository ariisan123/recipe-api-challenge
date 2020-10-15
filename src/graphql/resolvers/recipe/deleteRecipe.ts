import { Args, Ctx, Mutation, Resolver, UseMiddleware } from "type-graphql";
import { Recipe } from "../../../models/Recipe";
import { isAuth } from "../../middlewares/isAuth";
import { isLoggedIn } from "../../middlewares/isLogged";
import { idArg } from "../../types/Args";
import { MyContext } from "../../types/Context";
import { RecipeType } from "../../types/Recipe";

@Resolver()
export class deleteRecipe {
  @Mutation(() => RecipeType)
  @UseMiddleware(isAuth, isLoggedIn)
  async deleteRecipe(@Args() { id }: idArg, @Ctx() ctx: MyContext) {
    try {
      const { userId } = ctx.req.session;
      const recipe = await Recipe.findOne({ where: { id, user: userId } });
      if (!recipe) throw new Error(`Recipe with ID '${id}' not found`);

      return await Recipe.softRemove(recipe);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
