const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: [true, "Post header is required"],
      minlength: [10, "Header should not be less than 10 chars"],
    },
    body: {
      type: String,
      required: [true, "Post body is required"],
    },
    categories: [
      { type: String, required: [true, "Can't add empty category"] },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
