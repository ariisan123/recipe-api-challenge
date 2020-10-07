import { MiddlewareFn } from "type-graphql";
import { Category } from "../../entity/Category";

export const categoryExist: MiddlewareFn = async ({ args }, next) => {
  try {
    const category = args.category.trim();
    const result = await Category.findOne({ where: { name: category } });
    console.log(result);
    if (result) throw new Error("Category already exist");
    return next();
  } catch (err) {
    return err;
  }
};
