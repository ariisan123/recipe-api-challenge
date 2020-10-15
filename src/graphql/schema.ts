import { buildSchema } from "type-graphql";
import { createCategory } from "./resolvers/category/createCategory";
import { deleteCategory } from "./resolvers/category/deleteCategory";
import { getCategories } from "./resolvers/category/getCategories";
import { getOneCategory } from "./resolvers/category/getOneCategory";
import { updateCategory } from "./resolvers/category/updateCategory";
import { userRecipesField } from "./resolvers/user/recipesField";
import { LoginResolver } from "./resolvers/user/Login";
import { SignUpResolver } from "./resolvers/user/SignUp";
import { categoryRecipesField } from "./resolvers/category/recipesField";
import { getMyRecipes } from "./resolvers/recipe/getMyRecipes";
import { getRecipes } from "./resolvers/recipe/getRecipes";
import { getOneRecipe } from "./resolvers/recipe/getOneRecipe";
import { getRecipesByIngredients } from "./resolvers/recipe/getRecipesByIngredients";
import { createRecipe } from "./resolvers/recipe/createRecipe";
import { deleteRecipe } from "./resolvers/recipe/deleteRecipe";
import { updateRecipe } from "./resolvers/recipe/updateRecipe";
import { recipesUserField } from "./resolvers/recipe/userField";
import { recipesCategoryField } from "./resolvers/recipe/categoryField";

export async function getSchema() {
  try {
    return await buildSchema({
      resolvers: [
        LoginResolver,
        SignUpResolver,
        getOneCategory,
        deleteCategory,
        getCategories,
        createCategory,
        updateCategory,
        getMyRecipes,
        getRecipes,
        getOneRecipe,
        getRecipesByIngredients,
        createRecipe,
        deleteRecipe,
        updateRecipe,
        recipesUserField,
        recipesCategoryField,
        userRecipesField,
        categoryRecipesField
      ]
    });
  } catch (err) {
    return err;
  }
}
