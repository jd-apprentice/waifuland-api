import boom from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";

/**
 * @description Validates if the user exist in the database
 * @param {username} req
 * @param {NextFunction} next
 * @returns {Response} user ? error : next()
 */

const userExists = async (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;
  const user = await User.findOne({ username });
  return user ? res.json(boom.conflict("User already exists")) : next();
};

/**
 * @description Validates if the user is administrator and their username & password
 * @param {username} req
 * @param {password} req
 * @returns {NextFunction || Response} if the username && password match and the user is admin ? next : unauthorized
 */

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
    return isAdmin && isMatch ? next() : res.json(boom.unauthorized()); // If the username is admin and password match, then next()
  } catch (error) {
    return res.status(400) && res.json(boom.badRequest("Something went wrong")); // Error handling
  }
};

export { userExists, validateUser };
