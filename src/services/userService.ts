import userRepository from "../repositories/user-repository";
import { IUser } from "../models/interfaces/types";

class UserService {
  async findUserById(id: string) {
    return userRepository.findUser(id);
  }

  async findUserByUsername(username: string) {
    return userRepository.findUserByUsername(username);
  }

  async createUser(user: IUser) {
    return userRepository.create(user);
  }
}

export default new UserService();
