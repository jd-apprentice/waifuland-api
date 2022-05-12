import pkg from "mongoose";
const { Schema, model } = pkg;

const ImageSchema = new Schema(
  {
    id: { type: String, required: false },
    url: { type: String, required: false },
    tag: {
      name: { type: String, required: true },
      description: { type: String, required: true },
    },
    source: { type: String, required: true },
    is_nsfw: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model("Image", ImageSchema);
