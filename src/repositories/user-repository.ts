import { IUser } from "../models/interfaces/types";
import User from "../models/user";

class UserRepository {
  /**
   * @description Create a new user
   * @param {Iuser} user - user to be created
   */

  async create(user: IUser) {
    return User.create(user);
  }

  /**
   * @description Find a user by username
   * @param {string} id - username of the user
   */

  async findUser(id: string): Promise<IUser | null> {
    return User.findOne({ _id: id });
  }
}

export default new UserRepository();
