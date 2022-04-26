import User from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import generateAccessToken from "../services/generateToken";
import { IUser, UsernameType } from "../models/interfaces/types";
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
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save(); // Saving the user in the database
    return res.json({
      user: username,
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
  ): Promise<Response<string, Record<string, any>>> {
    const { username }: UsernameType = req.body;
    const token: string = generateAccessToken(username);
    return res
      .setHeader("Authorization", `Bearer ${token}`)
      .json({ token: token });
  }
}

export default new UserController();
