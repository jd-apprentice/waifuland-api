import { NextFunction, Response, Request } from "express";
import boom from "@hapi/boom";
import jwt from "jsonwebtoken";

const validateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
