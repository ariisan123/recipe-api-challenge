import * as DataLoader from 'dataloader';
import { Category } from '../../models/Category';
import { batchCategory } from '../types/Loaders';

const batchCategory: batchCategory = async (categoryIds) => {
  try {
    const categories = await Category.findByIds(categoryIds, {
      loadRelationIds: true
    });
    return categoryIds.map((categoryId) =>
      categories.find((category) => category.id === categoryId)
    );
  } catch (err) {
    console.log(err);
    return err;
  }
};

export const categoryLoader = () =>
  new DataLoader<string, Category>(batchCategory);
