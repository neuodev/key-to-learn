const Post = require("../models/Post");
const asyncHandler = require("express-async-handler");
const User = require("../models/User");

// @desc    Create new Post
// @route   POST /api/v1/post
// @access  Private
module.exports.createPost = asyncHandler(async (req, res, next) => {
  const { body, tags, pubished, thumbnail, header, categories } = req.body;
  if (!body || !body.blocks) {
    res.status(400);
    throw new Error("Post can't be empty");
  }

  body.blocks = body.blocks.map((b) => ({
    ...b,
    data: JSON.stringify(b.data),
  }));

  await Post.create({
    body,
    tags,
    pubished,
    thumbnail,
    header,
    categories,
    user: req.user,
  });
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
  res.status(200).json(res.advancedResults);
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

  await Post.findByIdAndDelete(req.params.id);

  res.status(200).json({ success: "Post deleted successfully" });
});

// @desc    Update Post by the user (Like , Dislike, add to favourite)
// @route   PUT /api/v1/post/user/:id
// @access  Private
module.exports.updatePostByUser = asyncHandler(async (req, res, next) => {
  const post = await Post.findOne({ id: req.params.id });
  if (!post) {
    res.status(404);
    throw new Error("Post Not Found");
  }

  const { like, dislike, addToFavourite } = req.body;
  if (!like && !dislike && !addToFavourite) {
    res.status(400);
    throw new Error("At least on field is requied to perform the update");
  }

  if (like) {
    for (const user of post.likes) {
      if (user._id.toString() === req.user._id.toString()) {
        res.status(404);
        throw new Error("Can't like the post twice");
      }
    }
    post.likes.push(req.user);
  }

  if (dislike) {
    post.likes = post.likes.filter(
      (u) => u._id.toString() !== req.user._id.toString()
    );
  }
  if (addToFavourite) {
    const user = req.user;
    user.favouriteList.push(post);
    await user.save();
  }
  await post.save();
  res.status(200).json({ success: "Operation done successfully" });
});
