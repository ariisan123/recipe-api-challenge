/* import { Recipe } from "../../entity/Recipe";

export class RecipeController {
  async createAndSave(userId: string, recipeObj: {}) {
    try {
      const newRecipe = Recipe.create({
        ...recipeObj,
        user: userId
      });
      return await Recipe.save(newRecipe);
    } catch (err) {
      return err;
    }
  }

  async getAllByUser(userId: string) {
    try {
      const recipes = await Recipe.find({
        where: { user: userId },
        relations: ["user"]
      });
      console.log(recipes);
      return recipes;
    } catch (err) {
      return err;
    }
  }

  async getAll() {
    return await Recipe.find({ relations: ["user"] });
  }
}
 */
