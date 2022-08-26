import { HydratedDocument } from "mongoose";
import { IUser } from "../models/interfaces/types";
import User from "../models/user";

class UserRepository {

  /**
   * @description Create a new user
   * @param {Iuser} user
   * @returns {Promise<HydratedDocument<T>>}
   */

  async create(user: IUser): Promise<HydratedDocument<IUser>> {
    return User.create(user);
  }
}

export default new UserRepository();
