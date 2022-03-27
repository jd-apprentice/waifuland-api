import User from "../models/user";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
class UserController {
  async createUser(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      throw new Error("User already exists");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save(); // Saving the user in the database
    res.json({ message: "User created succesfully" });
  }

  async validateUser(req: any, res: any) {
    res.json({ message: "User validated succesfully" });
  }
}

export default new UserController();
