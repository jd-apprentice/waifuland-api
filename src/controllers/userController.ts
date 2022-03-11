import User from "../models/user";
import bcrypt from 'bcrypt';

class UserController {
  async register(req: any, res: any) {
    const user = new User({
      username: req.body.username,
      password: bcrypt.hashSync(req.body.password, 10),
    });
    console.log(user)
    res.json({ message: user });
  }

  async login(req: any, res: any) {
    const user = {
      username: req.body.username,
      password: req.body.password
    }
    res.json({ message: user })
  }
}

export default new UserController();
