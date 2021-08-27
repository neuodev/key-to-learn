const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    post: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
    text: {
      type: String,
      required: "Comment should not be empty",
    },
  },
  {
    timestamps: true,
  }
);

const Comment = mongoose.model("Comment", CommentSchema);

module.exports = Comment;
