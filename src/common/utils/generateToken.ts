// External Modules
import jwt from "jsonwebtoken";

// Internal Modules
import Config from "../../app/config/config";

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
