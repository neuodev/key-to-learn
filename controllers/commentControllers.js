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

// @desc    Update a comment
// @route   GET /api/v1/comments/comment/:id
// @access  Public
module.exports.updateComment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const { text } = req.body;

  if (!text) {
    res.status(400);
    throw new Error("New text is required to update the comment");
  }

  const comment = await Comment.findById(id);
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }

  comment.text = text;
  await comment.save();
  res.status(200).json({ success: "Comment updated successfully" });
});

// @desc    Delete a comment
// @route   DELETE /api/v1/comments/comment/:id
// @access  Private
module.exports.deleteComment = asyncHandler(async (req, res, next) => {
  const id = req.params.id;
  const comment = await Comment.findById(id).populate("user");
  if (!comment) {
    res.status(404);
    throw new Error("Comment not found");
  }
  const user = req.user;
  if (!user.isAdmin && comment.user._id !== user._id) {
    throw new Error("Unautorized to delete comments");
  }

  await Comment.findByIdAndDelete(id);

  res.status(200).json({ success: "Comment deleted successfully" });
});
