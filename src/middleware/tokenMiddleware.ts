import { NextFunction, Response, Request } from "express";
import boom, { Boom } from "@hapi/boom";
import jwt from "jsonwebtoken";
import Config from "../config/config";

/**
 * @description Validate the jwt
 * @param {Authorization} req - Authorization headers
 * @returns {Response<Boom | NextFunction>} Jwt ? next : unauthorized
 */

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Boom | NextFunction | Response | unknown> => {
  const { secret } = Config.jwt;
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    if (secret) {
      const decoded = jwt.verify(token as string, secret);
      return decoded ? next() : res.json(boom.unauthorized());
    }
  } catch (error) {
    return res.status(401).json(boom.unauthorized("Invalid token"));
  }
};

export default validateToken;
