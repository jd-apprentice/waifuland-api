// External Modules
import pkg from "mongoose";

// Internal Modules
import { IUser } from "../../user/interfaces/user-interface";

const { Schema, model } = pkg;

const UserSchema = new Schema<IUser>(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
    profile_picture: { type: String, required: false },
  },
  { timestamps: true, versionKey: false }
);

export default model<IUser>("User", UserSchema);
