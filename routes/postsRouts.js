const epxress = require("express");
const {
  createPost,
  getPosts,
  updatePost,
  getPost,
  deletePost,
} = require("../controllers/postController");

const postsRouter = epxress.Router();

postsRouter.route("/").post(createPost).get(getPosts);
postsRouter.route("/:id").post(updatePost).get(getPost).delete(deletePost);

module.exports = postsRouter;
