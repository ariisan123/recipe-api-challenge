import { MiddlewareFn } from "type-graphql";
import { Utils } from "../controllers/utils";
import { MyContext } from "../types/Context";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    const { authorization } = context.req.headers;
    if (!authorization) throw new Error("ERROR not login");
    const token = authorization.split(" ")[1];
    Utils.verifyJwt(token);
    return next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") throw new Error("Invalid token");
    return err;
  }
};
