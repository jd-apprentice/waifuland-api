import { IUser } from "../models/interfaces/types";
import User from "../models/user";

class UserRepository {
  async create(user: IUser) {
    return User.create(user);
  }
}

export default new UserRepository();
