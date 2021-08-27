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
} = require("../controllers/userController");
const { admin, protect } = require("../middleware/authMiddleware");

const userRouter = express.Router();

userRouter
  .route("/")
  .post(registerUser)
  .get(protect, admin, getUsers)
  .delete(protect, admin, deleteUser);

userRouter.route("/login").post(authUser);

userRouter
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

userRouter
  .route("/:id")
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser);

module.exports = userRouter;
