import Userservice from "./user.services";
import User from "../Model/user.model";
import { UserInput } from "../Interfaces/user.type";
import { encryptPassword, comparePassword } from "../Utilities/Encrypt";
import { omit } from "lodash";
import ErrorUtil from "../Utilities/Error/create,error";
import JwtUtil from "../Utilities/jwt.utils";
import config from "config";

export default class AuthSessionservice {
  public async register(payload: UserInput): Promise<User> {
    try {
      const hashPassword = encryptPassword(payload.password);
      const user = await User.query().insert({
        ...payload,
        password: hashPassword,
      });
      return omit(user.toJSON(), 'password') as User;
    } catch (error: any) {
      throw new Error(error);
    }
  }
  public async signin(email: string, password: string): Promise<any> {
    const secretKey = config.get<string>('secretKey');
    try {
      const user = await User.query().findOne({ email });
      if (!user) throw ErrorUtil.createError(404, 'User not found!');

      const isCorrect = comparePassword(password, user.password);

      if (!isCorrect)
        throw ErrorUtil.createError(400, 'Wrong Credentials!');

      const token = JwtUtil.signJwt({ id: user.id }, secretKey);
      const { password: _, ...others } = user;

      return { token, user: others };
    } catch (err) {
      throw err;
    }
  }
  public static async googleAuth(userData: any): Promise<any> {
    const publicKey = config.get<string>('publicKey');
    const user = await User.query().findOne({ email: userData.email });

    if (user) {
      const token = JwtUtil.signJwt({ id: user.id }, publicKey);
      return { token, user };
    } else {
      const newUser = await User.query().insert({
        ...userData,
        from_google: true,
      });

      const updatedUser = await User.query().patch();
      console.log(updatedUser);
      

      const token = JwtUtil.signJwt({ id: updatedUser}, publicKey);
      return { token, user: updatedUser };
    }
  }
}