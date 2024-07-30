import { asyncHandler } from "../Helpers/asyncHandler.js";
import Conversation from "../Model/conversationModel.js";
import Message from "../Model/messageModel.js";

export const sendMesaage = asyncHandler(async (req, res, next) => {
  const senderId = req?.user;
  const { message } = req?.body;
  const receiverId = req?.params.id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  });

  if (!conversation) {
    conversation = new Conversation({
      participants: [senderId, receiverId],
    });
  }

  const newMessage = new Message({
    senderId,
    receiverId,
    message,
  });

  if (newMessage) {
    conversation.messages.push(newMessage._id);
  }

  await Promise.all([conversation.save(), newMessage.save()]);

  res.status(201).json({
    status: "success",
    message: "Message sent successfully",
    data: {
      conversation,
    },
  });
});

export const getMessages = asyncHandler(async (req, res, next) => {
  const senderId = req?.user;
  const receiverId = req?.params.id;

  let conversation = await Conversation.findOne({
    participants: { $all: [senderId, receiverId] },
  }).populate("messages");

  if (!conversation) {
    return res.status(200).json([]);
  }
  res.status(200).json({
    status: "success",
    data: conversation.messages,
  });
});
