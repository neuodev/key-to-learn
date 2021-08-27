const epxress = require("express");
const { createComment } = require("../controllers/commentControllers");
const { protect, admin } = require("../middleware/authMiddleware");

const commentsRouter = epxress.Router();

commentsRouter.route("/").post(protect, createComment);
// commentsRouter
//   .route("/:id")
//   .put(protect, admin, updatePost)
//   .get(getPost)
//   .delete(protect, admin, deletePost);

module.exports = commentsRouter;
