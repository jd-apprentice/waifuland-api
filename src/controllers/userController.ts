import bcrypt from "bcrypt";
import { Request, Response } from "express";
import generateAccessToken from "../services/generateToken";
import { IUser, UsernameType } from "../models/interfaces/types";
import UserService from "../services/userService";
class UserController {
  /**
   * @description Create a new user on the db, as default isAdmin is false so it can't upload images
   * @param {username<string>} req
   * @param {password<string>} req
   * @returns {Response<string>} A success message that the user was created
   */

  async createUser(req: Request, res: Response): Promise<Response> {
    const { username, password }: IUser = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await UserService.createUser({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    return res.json({
      message: "User created successfully",
    });
  }

  /**
   * @description Generates a token and setHeaders of the user
   * @param {username<string>} req
   * @returns {Response<string>} Json response with the token
   */

  async login(
    req: Request,
    res: Response
  ): Promise<Response<string, Record<string, unknown>>> {
    const { username }: UsernameType = req.body;
    const token = generateAccessToken(username);
    return res
      .setHeader("Authorization", `Bearer ${token}`)
      .json({ token: token });
  }
}

export default new UserController();
