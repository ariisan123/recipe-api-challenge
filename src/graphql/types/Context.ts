import { Request, Response } from "express";
import { categoryLoader } from "../loaders/categoryLoader";
import { userLoader } from "../loaders/userLoader";

export interface MyContext {
  req: Request;
  res: Response;
  userLoader: ReturnType<typeof userLoader>;
  categoryLoader: ReturnType<typeof categoryLoader>;
}
