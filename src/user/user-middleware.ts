// External Modules
import boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { LogArgument } from 'rollbar';

// Internal Modules
import User from './schema/user-schema';
import { Config } from 'src/app/config/config';
import { rollbar } from 'src/app/config/rollbar';
import { MiddlewareUser } from './interfaces/user-interface';

/**
 * Checks if a user with the given username already exists in the database
 * @param {Object} req.body - request body containing the username
 * @param {string} req.body.username - the username to check
 * @param {Response} res - response object
 * @param {NextFunction} next - next function
 * @returns {Promise<MiddlewareUser | NextFunction>}
 */
const userExists = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<MiddlewareUser> => {
  const { username } = req.body as { username: string };
  const sanitizedUsername = username.toString();

  try {
    const user = await User.findOne({ username: { $eq: sanitizedUsername } });

    if (user) {
      return res.status(409).json({ error: 'User already exists' });
    }

    return next();
  } catch (error: unknown) {
    rollbar.error(error as LogArgument);
    return res.status(500).json({ error });
  }
};

/**
 * @description Validates the user username & password of the request body
 * @param {string} req.body.username - the username to validate
 * @param {string} req.body.password - the password to validate
 * @returns {Promise<MiddlewareUser | NextFunction>} if the username & password match, then next() else return an error
 */
const validateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<MiddlewareUser> => {
  try {
    const { username, password } = req.body as {
      username: string;
      password: string;
    };
    const [sanitizedUsername, sanitizedPassword] = [
      username.toString(),
      password.toString(),
    ];

    const user = await User.findOne({
      $expr: { $eq: ['$username', sanitizedUsername] },
    });

    if (
      user?.password &&
      (await bcrypt.compare(sanitizedPassword, user.password))
    ) {
      return next();
    }

    return res.status(401).json(boom.unauthorized('Invalid credentials'));
  } catch (error) {
    return res.status(400).json(boom.badRequest('User not found'));
  }
};

/**
 * @description Validate if the user is administrator
 * @param {string} req.body.username - the username to validate
 * @returns {Promise<MiddlewareUser | NextFunction>} if the user is admin then next() else return an error
 */
const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<MiddlewareUser> => {
  const { username } = req.body as { username: string };
  const sanitizedUsername = username.toString();

  try {
    const user = await User.findOne({
      $expr: { $eq: ['$username', sanitizedUsername] },
    });

    if (user?.isAdmin) {
      return next();
    }

    return res.status(401).json(boom.unauthorized('Not admin'));
  } catch (error) {
    return res.status(400).json(boom.badRequest('User not found'));
  }
};

/**
 * @description Validate the JWT
 * @param {Authorization} req.headers - Authorization header with the token
 * @returns {Response<Boom | NextFunction>} Authorization error or next
 */
const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction,
): Promise<MiddlewareUser> => {
  const { secret } = Config.jwt;
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace('Bearer ', '');
    if (!token) return res.status(401).json(boom.unauthorized());
    if (secret) {
      const decoded = jwt.verify(token, secret);
      return decoded ? next() : res.status(401).json(boom.unauthorized());
    }
  } catch (error) {
    return res.status(401).json(boom.unauthorized());
  }
};

export { userExists, validateUser, isAdmin, validateToken };
