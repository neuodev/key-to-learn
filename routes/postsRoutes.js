const epxress = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/postController");
const { protect, admin } = require("../middleware/authMiddleware");

const postsRouter = epxress.Router();

postsRouter.route("/").post(protect, admin, createPost).get(getPosts);
postsRouter
  .route("/:id")
  .put(protect, admin, updatePost)
  .get(getPost)
  .delete(protect, admin, deletePost);

module.exports = postsRouter;
