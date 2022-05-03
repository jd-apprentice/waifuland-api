import { NextFunction, Response, Request } from "express";
import boom, { Boom } from "@hapi/boom";
import jwt from "jsonwebtoken";

/**
 * @description Validate the jwt
 * @param {Authorization} req
 * @returns {Response<Boom | NextFunction>} Jwt ? next : unauthorized
 */

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Boom | NextFunction | Response | unknown> => {
  try {
    const { authorization } = req.headers;
    const token = authorization?.replace("Bearer ", "");
    const decoded = jwt.verify(token!, process.env.TOKEN!);
    return decoded ? next() : res.json(boom.unauthorized());
  } catch (error) {
    return res.status(401).json(boom.unauthorized("Invalid token"));
  }
};

export default validateToken;
