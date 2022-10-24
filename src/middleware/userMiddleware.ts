import boom, { Boom } from "@hapi/boom";
import { NextFunction, Request, Response } from "express";
import User from "../models/user";
import bcrypt from "bcrypt";
import { UsernameType } from "../models/interfaces/types";

/**
 * @description Validates if the user exist in the database
 * @param {string} req.body.username - the username to check
 * @returns {Response<Boom | NextFunction>} Response with the next function
 */

const userExists = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Boom | NextFunction | Response | unknown> => {
  const { username }: UsernameType = req.body;
  const user: UsernameType | null = await User.findOne({ username });
  return user ? res.json(boom.conflict("User already exists")) : next();
};

/**
 * @description Validates if the user is administrator and their username & password
 * @param {string} req.body.username - the username to validate
 * @param {string} req.body.password - the password to validate
 * @returns {Response<Boom | NextFunction} if the username && password match and the user is admin then next() else return an error
 */

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Boom | NextFunction | Response | unknown> => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isAdmin = user?.isAdmin;
    const adminPassword = user?.password;
    const isMatch = await bcrypt.compare(password, adminPassword ?? password); // Compare the password with the hash password
    return isAdmin && isMatch ? next() : res.json(boom.unauthorized()); // If the username is admin and password match, then next()
  } catch (error) {
    return res.status(400) && res.json(boom.badRequest("Something went wrong")); // Error handling
  }
};

export { userExists, validateUser };
