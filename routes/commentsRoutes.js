const epxress = require("express");
const {
  createComment,
  getComments,
  updateComment,
  deleteComment,
} = require("../controllers/commentControllers");
const { protect } = require("../middleware/authMiddleware");

const commentsRouter = epxress.Router();

commentsRouter.route("/:postId").post(protect, createComment).get(getComments);
commentsRouter
  .route("/comment/:id")
  .put(protect, updateComment)
  .delete(protect, deleteComment);

module.exports = commentsRouter;
