import pkg from "mongoose";
const { Schema, model } = pkg;

const TagScheema = new Schema(
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
  },
  { timestamps: true, versionKey: false }
);

export default model("Tag", TagScheema);
