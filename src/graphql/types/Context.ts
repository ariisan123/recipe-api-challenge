import { Request, Response } from "express";
import { categoryLoader } from "../loaders/categoryLoader";
import { recipeLoader } from "../loaders/recipeLoader";
import { userLoader } from "../loaders/userLoader";

export interface MyContext {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof userLoader>;
  recipeLoader: ReturnType<typeof recipeLoader>;
  categoryLoader: ReturnType<typeof categoryLoader>;
}
