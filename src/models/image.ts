import pkg from "mongoose";
const { Schema, model } = pkg;

const ImageSchema = new Schema(
  {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model("Image", ImageSchema);
