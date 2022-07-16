import pkg from "mongoose";
const { Schema, model } = pkg;

const ImageSchema = new Schema({
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

export default model("Image", ImageSchema);
