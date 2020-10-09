import { Category } from "../../entity/Category";
import { Recipe } from "../../entity/Recipe";
import { User } from "../../entity/User";

export type batchUser = (ids: string[]) => Promise<User[]>;
export type batchRecipe = (ids: string[]) => Promise<Recipe[]>;
export type batchCategory = (ids: string[]) => Promise<Category[]>;
