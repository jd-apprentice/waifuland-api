import pkg from "mongoose";
import { Tag } from "./interfaces/types";
const { Schema, model } = pkg;

const TagScheema = new Schema<Tag>(
  {
    name: {
      type: String,
      required: true,
    },
    tag_id: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    is_nsfw: {
      type: Boolean,
      required: true,
    },
    is_active: {
      type: Boolean,
      required: true,
      default: true,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model<Tag>("Tag", TagScheema);
