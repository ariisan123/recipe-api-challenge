import { MiddlewareFn } from "type-graphql";
import { MyContext } from "../types/Context";

export const isLoggedIn: MiddlewareFn<MyContext> = async (
  { context },
  next
) => {
  try {
    if (!context.req.session.userId) throw new Error("Login first!");
    return next();
  } catch (err) {
    return err;
  }
};
