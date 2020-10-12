import { createCategory } from './createCategory';
import { deleteCategory } from './deleteCategory';
import { getCategories } from './getCategories';
import { getOneCategory } from './getOneCategory';
import { updateCategory } from './updateCategory';

export const CategoryResolver1 = [
  createCategory,
  deleteCategory,
  updateCategory,
  getCategories,
  getOneCategory
];
