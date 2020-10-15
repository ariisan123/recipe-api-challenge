import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { User } from "../../../models/User";
import { Utils } from "../../utils/Utils";
import { MyContext } from "../../types/Context";
import { TypeToken, LoginInput } from "../../types/User";

@Resolver()
export class LoginResolver {
  @Mutation(() => TypeToken)
  async login(@Arg("userObj") userObj: LoginInput, @Ctx() context: MyContext) {
    try {
      const { email, password } = userObj;

      const userInDatabase = await User.findOne({ where: { email } });
      if (!userInDatabase) throw new Error("Invalid email");

      const { password: hashedPass, id } = userInDatabase;
      const passOk = await Utils.comparePass(password, hashedPass);
      if (!passOk) throw new Error("Invalid password");

      context.req.session.userId = id;
      return Utils.signJwt(id);
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
