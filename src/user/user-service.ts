// Internal Modules
import { State } from "../common/interfaces/types";
import { IUser, MongoUser, UserPicture } from "./interfaces/user-interface";
import { decodeToken } from "../common/utils/decodeToken";
import userRepository from "./user-repository";

class UserService {
  async findUserById(id: string) {
    return userRepository.findUser(id);
  }

  async findUsers() {
    return userRepository.findUsers();
  }

  async updatePicture(token: string, user: UserPicture) {
    const username = decodeToken(token) as unknown as State<string>;
    const userFound = (await userRepository.findUserByUsername(
      username?.user
    )) as unknown as MongoUser;

    return userRepository.updatePicture(userFound?._id, user);
  }

  async getUserByToken(token: string) {
    const username = decodeToken(token) as unknown as State<string>;
    return userRepository.findUserByUsername(username?.user);
  }

  async getUserInfo(token: string) {
    const username = decodeToken(token) as unknown as State<string>;
    return userRepository.findUserByUsername(username?.user);
  }

  async findUserByUsername(username: string) {
    return userRepository.findUserByUsername(username);
  }

  async createUser(user: IUser) {
    return userRepository.create(user);
  }
}

export default new UserService();
