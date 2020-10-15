import { Ctx, Query, Resolver, UseMiddleware } from "type-graphql";
import { Recipe } from "../../../models/Recipe";
import { isAuth } from "../../middlewares/isAuth";
import { isLoggedIn } from "../../middlewares/isLogged";
import { MyContext } from "../../types/Context";
import { RecipeType } from "../../types/Recipe";

@Resolver()
export class getMyRecipes {
  @Query(() => [RecipeType], { nullable: true })
  @UseMiddleware(isAuth, isLoggedIn)
  async getMyRecipes(@Ctx() ctx: MyContext) {
    try {
      const { userId } = ctx.req.session;
      return await Recipe.find({
        where: { user: userId },
        loadRelationIds: true
      });
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
