import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Resolver,
  Root,
  UseMiddleware
} from "type-graphql";
import { userMiddleware } from "../middlewares/user";
import { MyContext } from "../types/Context";
import { RecipeType } from "../types/recipe";
import { User } from "../../entity/User";
import { Utils } from "../controllers/utils";
import { Recipe } from "../../entity/Recipe";
import { LoginInput, SignUpInput, TypeToken, UserType } from "../types/User";

@Resolver((of) => UserType)
export class UserResolver {
  @Mutation(() => TypeToken)
  @UseMiddleware(userMiddleware.getUser, userMiddleware.equalPass)
  login(@Arg("userObj") userObj: LoginInput, @Ctx() context: MyContext) {
    const { userId } = context.req.session;
    return Utils.signJwt(userId);
  }

  @Mutation(() => UserType)
  @UseMiddleware(userMiddleware.emailExist)
  async signUp(@Arg("userObj") userObj: SignUpInput) {
    const hashedpass = await Utils.createPass(userObj.password);
    return await User.create({ ...userObj, password: hashedpass }).save();
  }

  @FieldResolver(() => [RecipeType])
  async recipes(@Root() user: User) {
    const result = await Recipe.find({
      where: { user: user.id },
      loadRelationIds: true
    });
    // console.log(result);
    return result;
  }
}
