import passport from "passport";
import User from "../models/user";
const LocalStrategy = require("passport-local").Strategy;

const Local = () => {
  passport.use(
    new LocalStrategy(function (username: string, password: string, done: any) {
      User.findOne({ username: username }, function (err: Error, user: any) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      });
    })
  );
};

export default Local;
