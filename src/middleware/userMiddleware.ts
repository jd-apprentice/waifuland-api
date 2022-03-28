import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

const userExists = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  return user ? res.json(boom.conflict("User already exists")) : next();
};

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isAdmin = await user.isAdmin;
    const adminPassword = await user.password;
    const isMatch = await bcrypt.compare(password, adminPassword); // Compare the password with the hash password
    return isAdmin && isMatch ? next() : next(boom.unauthorized()); // If the username is admin and password match, then next()
  } catch (error) {
    return res.status(400) && res.json(boom.badRequest("Something went wrong")); // Error handling
  }
};

export { userExists, validateUser };
