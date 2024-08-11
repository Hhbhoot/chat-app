// Import necessary modules
import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { fileURLToPath } from "url";
// import { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
const __dirname = path.resolve();
const filepath = path.join(__dirname, "public");
import helmet from "helmet";

import { app } from "./Socket/Socket.js";

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(cookieParser());
app.use(cors());

import authRouter from "./Routes/authRoutes.js";
import messageRouter from "./Routes/messageRoutes.js";
import userRouter from "./Routes/userRoutes.js";

app.use(express.static(path.join(__dirname, "FrontEnd/dist")));
app.use("/public", express.static(filepath));
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/messages", messageRouter);
app.use("/api/v1/users", userRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "FrontEnd", "dist", "index.html"));
});

export default app;
