const express = require("express");
const { deletePost } = require("../controllers/postController");
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
} = require("../controllers/UserController");
const { admin, protect } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.route("/login").post(authUser);
userRouter
  .route("/")
  .post(admin, registerUser)
  .get(admin, getUsers)
  .delete(admin, deletePost);
userRouter.route("/:id").get(admin, getUserById).put(admin, updateUser);

userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

userRouter.route("/");
module.exports = userRouter;
