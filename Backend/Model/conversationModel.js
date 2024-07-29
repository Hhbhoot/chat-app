import mongoose from "mongoose";

const conversationSchema = new mongoose.Schema(
  {
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    messages: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: [] },
    ],
  },
  { timestamps: true }
);

const Conversation = mongoose.model("Conversation", conversationSchema);

export default Conversation;

// This schema represents a conversation between two users. It contains an array of participants (user IDs) and an array of messages (message IDs). Each participant can be referenced by their user ID in the User schema. Each message can be referenced by its message ID in the Message schema.
