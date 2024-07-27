// Import necessary modules
import express from "express";
import cors from "cors";
import path from "path";
import morgan from "morgan";
import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const filepath = path.join(__dirname, "public");

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

import userRouter from "./Routes/userRoutes.js";

app.use(cors());
app.use("/public", express.static(filepath));
app.use("/api/v1/users", userRouter);

export default app;
