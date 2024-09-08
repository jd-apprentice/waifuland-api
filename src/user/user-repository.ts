// Internal Modules
import User from '../user/schema/user-schema';
import { IUser, UserPicture } from './interfaces/user-interface';

class UserRepository {
  /**
   * @description Create a new user
   * @param {Iuser} user - user to be created
   */

  async create(user: IUser) {
    return User.create(user);
  }

  /**
   * @description Find users
   * @return {Promise<IUser[]>} - An array of users
   */

  async findUsers(): Promise<IUser[]> {
    return User.find();
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

  /**
   * @description Update user profile picture
   * @return { Promise<UserPicture> } - A result of updating the user
   */

  async updatePicture(
    id: string,
    picture: UserPicture,
  ): Promise<UserPicture | null> {
    return User.findByIdAndUpdate(
      id,
      { profile_picture: picture },
      { new: true },
    );
  }
}

export default new UserRepository();
