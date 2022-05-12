import pkg from "mongoose";
const { Schema, model } = pkg;

const TagScheema = new Schema({
  name: {
    type: String,
    required: true,
  },
  tag_id: {
    type: String,
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
});

export default model("Tags", TagScheema);
