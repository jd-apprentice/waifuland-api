import pkg from "mongoose";
import { IImage } from "./interfaces/types";
const { Schema, model } = pkg;

const ImageSchema = new Schema<IImage>(
  {
    id: { type: String, required: true },
    url: { type: String, required: true },
    tag: {
      type: Schema.Types.ObjectId,
      ref: "Tag",
    },
    source: { type: String, required: false },
    is_nsfw: { type: Boolean, required: true },
  },
  { timestamps: true, versionKey: false }
);

export default model<IImage>("Image", ImageSchema);
