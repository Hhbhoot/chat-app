import { asyncHandler } from "../Helpers/asyncHandler.js";
import Conversation from "../Model/conversationModel.js";
import Message from "../Model/messageModel.js";
import { getReceiverSocketId, io } from "../Socket/Socket.js";

export const sendMesaage = asyncHandler(async (req, res, next) => {
  const senderId = req?.user._id;
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

  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("newMessage", newMessage);
  }

  res.status(201).json({
    status: "success",
    message: "Message sent successfully",
    data: {
      newMessage,
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
    return res.status(200).json({ status: "success", data: [] });
  }
  res.status(200).json({
    status: "success",
    data: conversation.messages,
  });
});
