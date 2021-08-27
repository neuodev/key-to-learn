const express = require("express");
const {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/UserController");
const { admin, protect } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter.route("/login").post(authUser);
userRouter
  .route("/")
  .post(registerUser)
  .get(admin, getUsers)
  .delete(admin, deleteUser);
userRouter.route("/:id").get(admin, getUserById).put(admin, updateUser);

userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

userRouter.route("/");
module.exports = userRouter;
