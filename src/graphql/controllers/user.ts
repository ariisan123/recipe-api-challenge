import { User } from "../../entity/User";
import { Utils } from "./utils";

export class UserController extends Utils {
  async getOne(filterObj: {}) {
    try {
      console.log(filterObj);
      const result = await User.findOne({ where: filterObj });
      return result;
    } catch (err) {
      return err;
    }
  }

  async createAndSave(userObj: {}) {
    try {
      const newUser = User.create(userObj);
      newUser.password = await this.createPass(newUser.password);
      return await User.save(newUser);
    } catch (err) {
      return err;
    }
  }
}
