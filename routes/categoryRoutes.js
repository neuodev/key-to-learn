const epxress = require("express");
const {
  getCategories,
  createCategegory,
  updateCategory,
  deleteCategory,
} = require("../controllers/CategoryController");

const { protect, admin } = require("../middleware/authMiddleware");

const categoryRouter = epxress.Router();

categoryRouter
  .route("/")
  .post(protect, admin, createCategegory)
  .get(getCategories);
categoryRouter
  .route("/:id")
  .put(protect, admin, updateCategory)
  .delete(protect, admin, deleteCategory);

module.exports = categoryRouter;
