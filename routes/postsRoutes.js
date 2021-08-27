const epxress = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  getPost,
  deletePost,
  updatePostByUser,
} = require("../controllers/postController");
const { protect, admin } = require("../middleware/authMiddleware");

const postsRouter = epxress.Router();

postsRouter.route("/").post(protect, admin, createPost).get(getPosts);

postsRouter
  .route("/:id")
  .put(protect, admin, updatePost)
  .get(getPost)
  .delete(protect, admin, deletePost);

postsRouter.route("/user/:id").put(protect, updatePostByUser);
module.exports = postsRouter;
