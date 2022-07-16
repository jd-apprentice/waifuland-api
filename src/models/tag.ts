import pkg from "mongoose";
const { Schema, model } = pkg;

const TagScheema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tag_id: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  is_nsfw: {
    type: Boolean,
    required: false,
  },
  
}, { timestamps: true, versionKey: false });

export default model("Tag", TagScheema);
