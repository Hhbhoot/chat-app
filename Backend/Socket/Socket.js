import { Server } from "socket.io";
import http from "http";
import express from "express";
const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://192.168.1.37:5173"],
    methods: ["GET", "POST"],
  },
});

const userSocketMap = {}; // { userId : socketId }

export const getReceiverSocketId = (receiverId) => {
  return userSocketMap[receiverId];
};

io.on("connection", (socket) => {
  console.log("New client connected", socket.id);
  const userId = socket.handshake.query.userId;
  if (userId !== undefined) userSocketMap[userId] = socket.id;
  console.log(userSocketMap);

  io.emit("onlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    console.log("Client disconnected", socket.id);
    delete userSocketMap[userId];

    io.emit("onlineUsers", Object.keys(userSocketMap));
  });
});

export { app, io, server };
