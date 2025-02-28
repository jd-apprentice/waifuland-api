// Internal Modules
import { rollbar } from 'src/app/config/rollbar';
import User from 'src/user/schema/user-schema';
import { IUser, UserPicture } from './interfaces/user-interface';

class UserRepository {
  /**
   * @description Create a new user
   * @param {Iuser} user - user to be created
   */
  async create(user: IUser) {
    const sanitizedUsername = user.username.toString();
    const userExists = await this.findUserByUsername(sanitizedUsername);

    if (userExists) {
      rollbar.error('User already exists');
      throw new Error('User already exists');
    }

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
    const sanitizedId = id.toString();
    return User.findOne({ $expr: { $eq: ["$_id", sanitizedId] } })
  }

  /**
   * @description Find a user by username
   * @param {string} username - username of the user
   */
  async findUserByUsername(username: string): Promise<IUser | null> {
    const sanitizedUsername = username.toString();
    return User.findOne({ $expr: { $eq: ["$username", sanitizedUsername] } });
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
