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
   * @description Find a user by id
   * @param {string} id - id of the user
   */

  async findUser(id: string): Promise<IUser | null> {
    return User.findOne({ _id: id });
  }

  /**
   * @description Find a user by username
   * @param {string} username - username of the user
   */

  async findUserByUsername(username: string): Promise<IUser | null> {
    return User.findOne({ username });
  }
}

export default new UserRepository();
