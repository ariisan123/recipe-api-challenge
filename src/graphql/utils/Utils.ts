import * as brcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import "../../../dotenv.config";

export const Utils = {
  async createPass(password: string) {
    return await brcrypt.hash(password, 12);
  },

  async comparePass(password: string, hashedPass: string) {
    return await brcrypt.compare(password, hashedPass);
  },

  signJwt(id: string) {
    const token = jwt.sign({ id }, process.env.SECRET, { expiresIn: "1d" });
    return { token };
  },

  verifyJwt(token: string) {
    return jwt.verify(token, process.env.SECRET);
  }
};
