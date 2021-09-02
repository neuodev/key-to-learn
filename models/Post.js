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
    slug: {
      type: String,
      unique: [true, "Duplication on a slug"],
      required: [true, "Post header slug is required"],
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
    published: {
      type: Boolean,
      required: true,
      default: false,
    },
    thumbnail: {
      type: String,
      required: true,
      default: "https://picsum.photos/1080",
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    ],
    domain: {
      level: {
        type: String,
        enum: ["BASICS", "INTERMEDIATE", "ADVANCED"],
        default: "BASICS",
      },
      categories: [
        {
          type: String,
          required: [true, "Can't add empty category"],
        },
      ],
      subcategory: [
        { type: String, required: [true, "Can't add empty category"] },
      ],
      tags: [{ type: String, required: [true, "Can't add empty tag"] }],
    },
  },
  {
    timestamps: true,
  }
);

const Post = mongoose.model("Post", PostSchema);
module.exports = Post;
