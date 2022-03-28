import jwt from "jsonwebtoken";
const { TOKEN } = process.env;

const generateToken = (user: any) =>
  jwt.sign({ user }, TOKEN!, { expiresIn: "1d" });

export default generateToken;
