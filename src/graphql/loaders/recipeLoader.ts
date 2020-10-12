import * as DataLoader from 'dataloader';
import { Recipe } from '../../models/Recipe';
import { batchRecipe } from '../types/Loaders';

const batchRecipes: batchRecipe = async (recipeIds) => {
  try {
    const recipes = await Recipe.findByIds(recipeIds, {
      loadRelationIds: true
    });
    return recipeIds.map((recipeId) =>
      recipes.find((recipe) => recipe.id === recipeId)
    );
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const recipeLoader = () => new DataLoader<string, Recipe>(batchRecipes);
