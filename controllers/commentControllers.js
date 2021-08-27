const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

// @desc    Create new Comment
// @route   POST /api/v1/comment
// @access  Private
module.exports.createComment = asyncHandler(async (req, res, next) => {
  const { postId, text } = req.body;
  const user = req.user;
  if (!postId) {
    res.status(400);
    throw new Error("Post Id is required");
  }
  const postExist = await Post.findById(postId);

  if (!postExist) {
    res.status(404);
    throw new Error("Post not found");
  }

  await Comment.create({
    user,
    post: postExist,
    text,
  });
  res.status(200).json({ success: "Comment Created Successfully" });
});
