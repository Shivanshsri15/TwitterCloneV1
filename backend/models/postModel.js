import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    commentName: { type: String, required: true },
    commentText: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    commentLikes: [],
  },
  {
    timestamps: true,
  }
);

const postSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    postImages: [
      {
        type: String,
        required: true,
      },
    ],
    postText: {
      type: String,
      required: true,
    },
    tags: [],
    comment: [commentSchema],
    postLikes: [],
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Post", postSchema);

export default Comment;
