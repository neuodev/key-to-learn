const Comment = require("../models/Comment");
const asyncHandler = require("express-async-handler");
const Post = require("../models/Post");

// @desc    Create new Comment
// @route   POST /api/v1/comment/:postId
// @access  Private
module.exports.createComment = asyncHandler(async (req, res, next) => {
  const { text } = req.body;
  const postId = req.params.postId;
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

// @desc    Get comments for a post
// @route   GET /api/v1/comments/:postId
// @access  Public
module.exports.getComments = asyncHandler(async (req, res, next) => {
  const postId = req.params.postId;
  if (!postId) {
    res.status(400);
    throw new Error("Post ID is required");
  }
  const post = await Post.findById(postId);

  if (!post) {
    res.status(404);
    throw new Error("Post not found");
  }

  const comments = await Comment.find({
    post: postId,
  });
  res.status(200).json({ comments });
});
