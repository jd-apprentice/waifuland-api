// External Modules
import pkg from "mongoose";

// Internal Modules
import { ITag } from "../../tag/intefaces/tag-interface";

const { Schema, model } = pkg;

const TagScheema = new Schema<ITag>(
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

export default model<ITag>("Tag", TagScheema);
