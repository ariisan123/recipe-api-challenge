import { MiddlewareFn } from "type-graphql";
import { UserController } from "../controllers/user";

class UserMiddleware extends UserController {
  emailExist: MiddlewareFn = async ({ args }, next) => {
    try {
      const { email } = args.userObj;
      const result = await this.getOne({ email });
      if (result) throw new Error("email already in use");
      return next();
    } catch (err) {
      return err;
    }
  };
  getUser: MiddlewareFn = async ({ args }, next) => {
    try {
      const { email } = args.userObj;
      const user = await this.getOne({ email });
      if (!user) throw new Error("incorrect email");
      args.userObj.id = user.id;
      args.userObj.hashedPass = user.password;
      return next();
    } catch (err) {
      return err;
    }
  };
  equalPass: MiddlewareFn = async ({ args }, next) => {
    try {
      const { password, hashedPass } = args.userObj;
      const isOk = await this.comparePass(password, hashedPass);
      if (!isOk) throw new Error("incorrect password");
      return next();
    } catch (err) {
      return err;
    }
  };
}

export const userMiddleware: UserMiddleware = new UserMiddleware();
