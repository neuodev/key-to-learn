const Message = require("../models/Message");
const asyncHandler = require("express-async-handler");
// @desc    Send a message
// @route   POST /api/v1/message
// @access  Public
module.exports.sendMessage = asyncHandler(async (req, res, next) => {
  await Message.create(req.body);

  res.status(200).json({ success: "Message sended successfully" });
});

// @desc    Get All Messages
// @route   POST /api/v1/message
// @access  Private
module.exports.getMessages = asyncHandler(async (req, res, next) => {
  const messages = await Message.find({});

  res.status(200).json({ messages });
});
