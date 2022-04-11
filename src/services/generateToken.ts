import jwt from "jsonwebtoken";
const { TOKEN } = process.env;

/**
 * @description Signs a token
 * @param {string} user
 * @returns {string} token
 */

const generateToken = (user: string): string =>
  jwt.sign({ user }, TOKEN!, { expiresIn: "1d" });

export default generateToken;
