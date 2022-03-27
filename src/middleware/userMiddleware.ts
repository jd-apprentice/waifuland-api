import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

const userMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username }); 
    !user && res.json(boom.badRequest("User does not exist")); 
    const isAdmin = await user.isAdmin; 
    const adminPassword = await user.password; 
    const isMatch = await bcrypt.compare(password, adminPassword);  // Compare the password with the hash password
    isAdmin && isMatch ? next() : next(boom.unauthorized()); // If the username is admin and password match, then next()
  } catch (error) {
    return res.status(400).json // If there is an error, we return a 400 status code
  }
};

export default userMiddleware;
