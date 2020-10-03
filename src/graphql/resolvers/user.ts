import {
  Arg,
  Ctx,
  Mutation,
  Query,
  Resolver,
  UseMiddleware
} from 'type-graphql';
import { UserController } from '../controllers/user';
import { LoginUser, SignUpUser, TypeToken, TypeUser } from '../typeDefs/user';
import { userMiddleware } from '../middlewares/user';
import { isAuth } from '../middlewares/isAuth';
import { MyContext } from '../typeDefs/context';

@Resolver()
export class UserResolver extends UserController {
  @Query()
  @UseMiddleware(isAuth)
  getuser(): TypeToken {
    console.log('sdkfjksldfj');
    return { token: 'asd1klfjsf' };
  }

  @Mutation(() => TypeToken)
  @UseMiddleware(userMiddleware.getUser, userMiddleware.equalPass)
  async login(@Arg('userObj') userObj: LoginUser, @Ctx() context: MyContext) {
    const { id } = context.session;
    return this.signJwt(id);
  }

  @Mutation(() => TypeUser)
  @UseMiddleware(userMiddleware.emailExist)
  async signUp(@Arg('userObj') userObj: SignUpUser) {
    return await this.createAndSave(userObj);
  }
}
