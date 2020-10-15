import { Arg, Mutation, Resolver } from "type-graphql";
import { User } from "../../../models/User";
import { Utils } from "../../utils/Utils";
import { UserType, SignUpInput } from "../../types/User";

@Resolver()
export class SignUpResolver {
  @Mutation(() => UserType)
  async signUp(@Arg("userObj") userObj: SignUpInput) {
    try {
      const { email, password } = userObj;
      const emailInDatabase = await User.findOne({ where: { email } });
      if (emailInDatabase) throw new Error("Email already in use");

      const hashedpass = await Utils.createPass(password);
      return await User.create({ ...userObj, password: hashedpass }).save();
    } catch (err) {
      console.log(err);
      return err;
    }
  }
}
