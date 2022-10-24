import pkg from "mongoose";
const { Schema, model } = pkg;

const UserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: false, default: false },
    profile_picture: { type: String, required: false },
  },
  { timestamps: true, versionKey: false }
);

export default model("User", UserSchema);
