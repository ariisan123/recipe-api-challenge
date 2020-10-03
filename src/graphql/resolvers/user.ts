import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { UserController } from "../controllers/user";
import { LoginUser, SignUpUser, TypeToken, TypeUser } from "../typeDefs/user";
import { userMiddleware } from "../middlewares/user";

@Resolver()
export class UserResolver extends UserController {
  @Query()
  getuser(): TypeToken {
    console.log("sdkfjksldfj");
    return { token: "asdklfjsf" };
  }

  @Mutation(() => TypeToken)
  @UseMiddleware(userMiddleware.getUser, userMiddleware.equalPass)
  login(@Arg("userObj") userObj: LoginUser) {
    const { id } = userObj;
    return this.signJwt(id);
  }

  @Mutation(() => TypeUser)
  @UseMiddleware(userMiddleware.emailExist)
  async signUp(@Arg("userObj") userObj: SignUpUser) {
    return await this.createAndSave(userObj);
  }
}
