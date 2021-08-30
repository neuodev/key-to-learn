const mongoose = require("mongoose");

const CategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  subcategories: [
    {
      type: String,
      required: "Can't create an empyt subcategory",
      unique: true,
    },
  ],
});

const Category = mongoose.model("Category", CategorySchema);

module.exports = Category;
