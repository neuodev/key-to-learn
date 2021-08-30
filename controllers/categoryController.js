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
  const { newName, newSubcategory, oldSubcategoryName } = req.body;
  if (newName && newSubcategory) {
    res.status(400);
    throw new Error(
      "At least on field should be provided to perofrm the update"
    );
  }
  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  if (newName) {
    category.name = newName.trim() || category.name;
  }
  if (newSubcategory && oldSubcategoryName) {
    category.subcategories = category.subcategories.filter(
      (sub) => sub.toString() !== oldSubcategoryName.toString()
    );
    category.subcategories.push(newSubcategory);
  }
  await category.save();
  res.status(200).json({ success: "Category updated successfully" });
});

// @desc    Create new category
// @route   POST /api/v1/categories
// @access  Private
module.exports.createCategegory = asyncHandler(async (req, res, next) => {
  const { name, subcategory } = req.body;
  const categories = await Category.find({ name });
  const category = categories[0];
  if (name && !subcategory && category) {
    res.status(400);
    throw new Error("Category Aleady exist");
  }
  if (!category) {
    await Category.create({
      name: name.trim().replace(/ /g, "-"),
      subcategories: [],
    });
  } else if (subcategory) {
    const catSet = new Set(category.subcategories);
    if (catSet.has(subcategory)) {
      res.status(400);
      throw new Error("Subcategory Already Exist");
    }
    category.subcategories.push(subcategory.trim().replace(/ /g, "-"));
    await category.save();
  }
  res.status(200).json({ success: "Category created successfully" });
});

// @desc    Delete Category by name
// @route   DELETE /api/v1/categories/:id
// @access  Private
module.exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { subcategory } = req.query;
  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }
  if (subcategory) {
    category.subcategories = category.subcategories.filter(
      (sub) => sub.toString() !== subcategory.toString()
    );
    await category.save();
  } else {
    await Category.findByIdAndDelete(id);
  }
  res.status(200).json({ success: "Deleted successfully" });
});
