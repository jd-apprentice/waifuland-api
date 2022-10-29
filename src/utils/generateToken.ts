import jwt from "jsonwebtoken";
import Config from "../config/config";

/**
 * @description Signs a token
 * @param {string} user - The user to sign
 * @returns {string} Generates a token
 */

const generateToken = (user: string): string | undefined => {
  const { secret } = Config.jwt;
  if (secret) {
    return jwt.sign({ user }, secret, { expiresIn: "7d" });
  }
};

export default generateToken;
