import User from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import generateAccessToken from "../services/generateToken";

class UserController {
  async createUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const token = generateAccessToken(username);
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save(); // Saving the user in the database
    return res.json({
      user: username,
      token: token,
    });
  }

  async validateUser(req: Request, res: Response) {
    return res.json({ message: "User validated succesfully" });
  }
}

export default new UserController();
