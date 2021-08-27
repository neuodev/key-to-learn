const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

// @desc    Get All Categories
// @route   GET /api/v1/categories
// @access  Public
module.exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = Category.find().select("-posts");
  res.status(200).json({ categories });
});

// @desc    Update Category
// @route   PUT /api/v1/categories/:name
// @access  Private
module.exports.updateCategory = asyncHandler(async (req, res, next) => {
  const name = req.params.name;
  if (!req.body.name) {
    res.status(400);
    throw new Error("New name is required");
  }
  const category = Category.find({ name });
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  category.name = req.body.name;
  category.save();
  res.status(200).json({ success: "Category updated successfully" });
});

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private
module.exports.createCategegory = asyncHandler(async (req, res, next) => {
  const { name } = req.body;
  await Category.create({
    name,
  });
  res.status(200).json({ success: "Category created successfully" });
});

// @desc    Delete Category by name
// @route   DELETE /api/v1/categories/:name
// @access  Private
module.exports.getCategories = asyncHandler(async (req, res, next) => {
  const name = req.params.name;
  const category = Category.find({ name });
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  await Category.deleteOne({ name });
  res.status(200).json({ success: "Category deleted successfully" });
});
