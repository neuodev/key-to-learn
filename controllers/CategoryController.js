const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

// @desc    Get All Categories
// @route   GET /api/v1/categories
// @access  Public
module.exports.getCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find({});
  res.status(200).json({ categories });
});

// @desc    Update Category
// @route   PUT /api/v1/categories/:id
// @access  Private
module.exports.updateCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  if (!req.body.name) {
    res.status(400);
    throw new Error("New name is required");
  }
  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  category.name = req.body.name;
  await category.save();
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
// @route   DELETE /api/v1/categories/:id
// @access  Private
module.exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  await Category.findByIdAndDelete(id);
  res.status(200).json({ success: "Category deleted successfully" });
});
