// External Modules
import boom, { Boom } from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// Internal Modules
import User from './schema/user-schema';
import Config from '../app/config/config';
import { UsernameType } from './interfaces/user-interface';

/**
 * @description Validates if the user exist in the database
 * @param {string} req.body.username - the username to check
 * @returns {Response<Boom | NextFunction>} Response with the next function
 */

const userExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Boom | NextFunction | Response | unknown> => {
  const { username }: UsernameType = req.body;
  const user: UsernameType | null = await User.findOne({ username });
  return user ? res.json(boom.conflict('User already exists')) : next();
};

/**
 * @description Validates the user username & password of the request body
 * @param {string} req.body.username - the username to validate
 * @param {string} req.body.password - the password to validate
 * @returns {Response<Boom | NextFunction} if the username && password match then next() else return an error
 */

const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Boom | NextFunction | Response | unknown> => {
  try {
    const { username, password } = req.body;
    const userExists = await User.findOne({ username });
    const user = userExists?.username;
    const pass = userExists?.password;
    const isMatch = pass && (await bcrypt.compare(password, pass)); // Compare the password with the hash password
    const isValid = user && isMatch;
    return isValid ? next() : res.json(boom.badRequest('Invalid credentials'));
  } catch (error) {
    return res.status(400) && res.json(boom.badRequest('Something went wrong'));
  }
};

/**
 * @description Validate if the user is administrator
 * @param {string} req.body.username - the username to validate
 * @returns {Promise<Boom | NextFunction | Response | unknown>} if the user is admin then next() else return an error
 */

const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Boom | NextFunction | Response | unknown> => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ username });
    return user?.isAdmin ? next() : res.json(boom.unauthorized('Not admin'));
  } catch (error) {
    return res.status(400) && res.json(boom.badRequest('User not found'));
  }
};

/**
 * @description Validate the jwt
 * @param {Authorization} req.headers - Authorization header with the token
 * @returns {Response<Boom | NextFunction>} Authorization error or next
 */

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<Boom | NextFunction | Response | unknown> => {
  const { secret } = Config.jwt;
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (secret) {
      const decoded = jwt.verify(token as string, secret);
      return decoded ? next() : res.json(boom.unauthorized());
    }
  } catch (error) {
    return res.status(401).json(boom.unauthorized('Invalid token'));
  }
};

export { userExists, validateUser, isAdmin, validateToken };
