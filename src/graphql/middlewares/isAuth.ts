import { MiddlewareFn } from "type-graphql";
import { Utils } from "../utils/Utils";
import { MyContext } from "../types/Context";

export const isAuth: MiddlewareFn<MyContext> = async ({ context }, next) => {
  try {
    const { authorization } = context.req.headers;
    if (!authorization)
      throw new Error("Error, you have to send the Authorization token");
    const token = authorization.split(" ")[1];
    Utils.verifyJwt(token);
    return next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") throw new Error("Invalid token");
    return err;
  }
};
