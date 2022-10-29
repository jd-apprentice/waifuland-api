import bcrypt from "bcrypt";
import { Request, Response } from "express";
import generateAccessToken from "../utils/generateToken";
import UserService from "../services/userService";
import userService from "../services/userService";
class UserController {
  /**
   * @description Create a new user on the db, as default isAdmin is false so it can't upload images
   * @param {string} req.body.username - username of the user
   * @param {string} req.body.password - password of the user
   * @returns {Promise<Response>} A success message that the user was created
   */

  async createUser(req: Request, res: Response): Promise<Response> {
    const { username, password } = req.body;
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
   * @param {string} req.body.username - username of the user
   * @returns {Promise<Response>} Json response with the token
   */

  async login(req: Request, res: Response): Promise<Response> {
    const { username } = req.body;
    const token = generateAccessToken(username);
    const user = await userService.findUserByUsername(username);
    const picture = user?.profile_picture;
    return res.json({ token: token, picture });
  }

  /**
   * @description Get user by username
   * @param {string} req.params.id - username of the user
   * @returns {Promise<Response>} Json response with the user
   */

  async getUser(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await userService.findUserByUsername(id);
    return res.json({
      user: user?.username,
      picture: user?.profile_picture,
      isAdmin: user?.isAdmin,
    });
  }
}

export default new UserController();
