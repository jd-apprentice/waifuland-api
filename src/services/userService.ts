import userRepository from "../repositories/user-repository";
import { IUser } from "../models/interfaces/types";

class UserService {
  async createUser(user: IUser) {
    return userRepository.create(user);
  }
}

export default new UserService();
