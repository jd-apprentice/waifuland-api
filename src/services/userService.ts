import { IUser } from "../models/interfaces/types";
import User from "../models/user";

class UserService {
  async createUser(user: IUser) {
    const { username, password } = user;
    const newUser = new User({
      username,
      password,
    });
    await newUser.save();
  }
}

export default new UserService();
