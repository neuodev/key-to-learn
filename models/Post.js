const mongoose = require("mongoose");

const block = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  data: String,
});

const PostSchema = new mongoose.Schema(
  {
    header: {
      type: String,
      required: [true, "Post header is required"],
      minlength: [10, "Header should not be less than 10 chars"],
    },
    body: {
      blocks: [block],
      time: {
        type: Number,
        required: true,
      },
      version: {
        type: String,
        required: true,
      },
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
