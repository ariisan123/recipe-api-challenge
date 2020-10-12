import { Category } from '../../models/Category';
import { Recipe } from '../../models/Recipe';
import { User } from '../../models/User';

export type batchUser = (ids: string[]) => Promise<User[]>;
export type batchRecipe = (ids: string[]) => Promise<Recipe[]>;
export type batchCategory = (ids: string[]) => Promise<Category[]>;
