const epxress = require("express");
const {
  createComment,
  getComments,
} = require("../controllers/commentControllers");
const { protect, admin } = require("../middleware/authMiddleware");

const commentsRouter = epxress.Router();

commentsRouter.route("/:postId").post(protect, createComment).get(getComments);
// commentsRouter
//   .route("/:id")
//   .put(protect, admin, updatePost)
//   .get(getPost)
//   .delete(protect, admin, deletePost);

module.exports = commentsRouter;
