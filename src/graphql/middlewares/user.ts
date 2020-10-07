import { MiddlewareFn } from "type-graphql";
import { User } from "../../entity/User";
import { Utils } from "../controllers/utils";
import { MyContext } from "../types/Context";

export class UserMiddleware {
  emailExist: MiddlewareFn = async ({ args }, next) => {
    try {
      const { email } = args.userObj;
      const result = await User.findOne({ where: { email } });
      if (result) throw new Error("email already in use");
      return next();
    } catch (err) {
      return err;
    }
  };
  getUser: MiddlewareFn<MyContext> = async ({ args, context }, next) => {
    try {
      const { email } = args.userObj;
      const user = await User.findOne({ where: { email } });
      if (!user) throw new Error("incorrect email");
      context.req.session.userId = user.id;
      args.userObj.hashedPass = user.password;
      return next();
    } catch (err) {
      return err;
    }
  };
  equalPass: MiddlewareFn = async ({ args }, next) => {
    try {
      let { password, hashedPass } = args.userObj;
      const isOk = await Utils.comparePass(password, hashedPass);
      hashedPass = null;
      if (!isOk) throw new Error("incorrect password");
      return next();
    } catch (err) {
      return err;
    }
  };
}

export const userMiddleware: UserMiddleware = new UserMiddleware();
