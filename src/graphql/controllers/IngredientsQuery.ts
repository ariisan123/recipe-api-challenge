import { Recipe } from "../../entity/Recipe";

export const filterByIngredient = async (
  ingredients: string[]
): Promise<Recipe[]> => {
  try {
    const result = await Recipe.createQueryBuilder("recipe")
      .where(
        `JSON_CONTAINS(JSON_EXTRACT(ingredients,"$"),JSON_ARRAY(:ingredients))`,
        { ingredients }
      )
      .loadAllRelationIds()
      .getMany();

    return result;
  } catch (err) {
    return err;
  }
};
