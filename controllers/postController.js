const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");

// @desc    Create new Post
// @route   POST /api/v1/post
// @access  Private
module.exports.createPost = asyncHandler(async (req, res, next) => {
  const { body } = req.body;
  if (!body || !body.blocks) {
    res.status(400);
    throw new Error("Post can't be empty");
  }

  body.blocks = body.blocks.map((b) => ({
    ...b,
    data: JSON.stringify(b.data),
  }));
  await Post.create(req.body);
  res.status(200).json({ success: "Post Created Successfully" });
});

// @desc    Update Post
// @route   PUT /api/v1/posts/:id
// @access  Private
module.exports.updatePost = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const post = await Post.findById(id);

  if (!post) {
    res.status(404);
    throw new Error("Post Not Found");
  }
  const { header, body, addCategories, removeCategories } = req.body;
  if (!header && !body && !addCategories && !removeCategories) {
    res.status(400);
    throw new Error("At least one field is requried to perform the update");
  }

  if (body) {
    body.blocks = body.blocks.map((b) => ({
      ...b,
      data: JSON.stringify(b.data),
    }));
  }
  post.header = header || post.header;
  post.body = body || post.body;

  if (addCategories) {
    if (!(addCategories instanceof Array)) {
      res.status(400);
      throw new Error("Expected AddCategories to be an array");
    }
    const categoriesSet = new Set(post.categories);
    for (const cat of addCategories) {
      if (!categoriesSet.has(cat)) {
        post.categories.push(cat);
      }
    }
  }

  if (removeCategories) {
    if (!(removeCategories instanceof Array)) {
      res.status(400);
      throw new Error("Expected removeCategories to be an array");
    }
    const removeCategoriesSet = new Set(removeCategories);
    post.categories = post.categories.filter(
      (c) => !removeCategoriesSet.has(c)
    );
  }
  await post.save();
  res.status(200).json({ success: "Post Updated Successfully" });
});

// @desc    Get All Posts
// @route   GET /api/v1/post
// @access  Private
module.exports.getPosts = asyncHandler(async (req, res, next) => {
  const posts = await Post.find();
  res.status(200).json({ posts });
});

// @desc    Get Single Post
// @route   GET /api/v1/post/:id
// @access  Private
module.exports.getPost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found");
    return;
  }
  res.status(200).json({ post });
});

// @desc    Delete Post by Id
// @route   DELETE /api/v1/post/:id
// @access  Private
module.exports.deletePost = asyncHandler(async (req, res, next) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found");
  }

  // @todo => Check if the user is admin
  await Post.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: "Post deleted successfully" });
});
