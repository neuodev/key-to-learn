const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Post",
    },
  ],
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
