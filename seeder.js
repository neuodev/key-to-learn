const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");
const users = require("./data/users");
const posts = require("./data/posts");
const User = require("./models/User");
const Post = require("./models/Post");
const connectDB = require("./config/db");

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const sampleposts = posts.map((post) => {
      post.body.blocks = post.body.blocks.map((b) => ({
        ...b,
        data: JSON.stringify(b.data),
      }));
      return {
        ...post,
        user: createdUsers[0],
      };
    });

    await Post.insertMany(sampleposts);

    console.log("Data Imported!".green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Post.deleteMany();
    await User.deleteMany();

    console.log("Data Destroyed!".red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
