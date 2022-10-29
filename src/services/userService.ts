import userRepository from "../repositories/user-repository";
import { IUser } from "../models/interfaces/types";

class UserService {
  async findUserByUsername(id: string) {
    return userRepository.findUser(id);
  }

  async createUser(user: IUser) {
    return userRepository.create(user);
  }
}

export default new UserService();
