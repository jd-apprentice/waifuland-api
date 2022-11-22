// External Modules
import bcrypt from "bcrypt";
import { Request, Response } from "express";

// Internal Modules
import userService from "./user-service";
import generateAccessToken from "../common/utils/generateToken";
import clearTemporaryFiles from "../common/utils/clear";
import imageService from "../image/image-service";
import { UserPicture } from "./interfaces/user-interface";

class UserController {
  /**
   * @description Find all users
   * @param { Response } res object
   * @returns { Promise<Response> } All users from the database without business logic
   */

  async getUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userService.findUsers();
      return res.json(users);
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * @description Create a new user on the db, as default isAdmin is false so it can't upload images
   * @param {string} req.body.username - username of the user
   * @param {string} req.body.password - password of the user
   * @returns {Promise<Response>} A success message that the user was created
   */

  async createUser(req: Request, res: Response): Promise<Response> {
    try {
      const { username, password } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await userService.createUser({
        username,
        password: hashedPassword,
      });
      await newUser.save();
      return res.json({
        message: "User created successfully",
      });
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * @description Generates a token and setHeaders of the user
   * @param {string} req.body.username - username of the user
   * @returns {Promise<Response>} Json response with the token
   */

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { username } = req.body;
      const user = await userService.findUserByUsername(username);
      const token = generateAccessToken(username);
      return res.json({ token: token, picture: user?.profile_picture });
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * @description Get user by username
   * @param {string} req.params.id - username of the user
   * @returns {Promise<Response>} Json response with the user
   */

  async getUser(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await userService.findUserById(id);
      return res.json(user);
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * @description Get user info by token
   * @param {string} req.headers.token - token of the user
   * @returns {Promise<Response>} Json response with the user
   */

  async getUserInfo(req: Request, res: Response): Promise<Response> {
    try {
      const { authorization } = req.headers;
      const token = authorization?.replace("Bearer ", "");
      const user = await userService.getUserInfo(token as string);
      return res.json({
        username: user?.username,
        profile_picture: user?.profile_picture,
        isAdmin: user?.isAdmin,
        id: user?._id,
      });
    } catch (error) {
      return res.json(error);
    }
  }

  /**
   * @description Update profile picture of the user
   * @param {string} req.body.profile_picture - url of the profile picture
   * @param {string} req.headers.authorization - token of the user
   * @returns { Promise<Response> } Json response with the updated user
   */

  async updatePicture(req: Request, res: Response): Promise<Response> {
    try {
      const { file } = req;
      const { authorization } = req.headers;
      const token = authorization?.replace("Bearer ", "") as string;
      const findUser = await userService.getUserByToken(token);
      const image = await imageService.cloudinaryUpload(
        file?.path,
        findUser?._id,
        findUser?.username
      );
      const { secure_url } = image;
      clearTemporaryFiles(file?.path ?? "image/assets/images");
      const user = await userService.updatePicture(
        token,
        secure_url as UserPicture
      );
      return res.json({
        message: "Profile picture updated",
        picture: user?.profile_picture,
      });
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new UserController();
