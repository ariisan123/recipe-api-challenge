import * as brcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import "../../../dotenv.config";

export class Utils {
  async createPass(password: string) {
    const hashedPass = await brcrypt.hash(password, 12);
    return hashedPass;
  }

  async comparePass(password: string, hashedPass: string) {
    const isOk = await brcrypt.compare(password, hashedPass);
    return isOk;
  }

  signJwt(id: string) {
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
    return { token };
  }

  verifyJwt(token: string) {
    const isOk = jwt.verify(token, process.env.SECRET);
    console.log(isOk);
    return isOk;
  }
}
