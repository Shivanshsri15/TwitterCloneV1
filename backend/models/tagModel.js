import mongoose from "mongoose";

const tagSchema = mongoose.Schema({
  tagTitle: {
    type: String,
    required: true,
  },
  tagPosts: [],
});

const Tags = mongoose.model("Tags", tagSchema);

export default Tags;
