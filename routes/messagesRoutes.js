const epxress = require("express");
const {
  sendMessage,
  getMessages,
} = require("../controllers/messageController");

const { admin, protect } = require("../middleware/authMiddleware");

const messagesRouter = epxress.Router();

messagesRouter.route("/").post(sendMessage).get(protect, admin, getMessages);

module.exports = messagesRouter;
