const epxress = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  getPost,
  deletePost,
  updatePostByUser,
} = require("../controllers/postController");
const advancedResults = require("../middleware/advancedResults");
const { protect, admin } = require("../middleware/authMiddleware");
const Post = require("../models/Post");

const postsRouter = epxress.Router();

postsRouter
  .route("/")
  .post(protect, admin, createPost)
  .get(advancedResults(Post), getPosts);

postsRouter
  .route("/:id")
  .put(protect, admin, updatePost)
  .delete(protect, admin, deletePost);

postsRouter.route("/:slug").get(getPost);

postsRouter.route("/user/:id").put(protect, updatePostByUser);
module.exports = postsRouter;
