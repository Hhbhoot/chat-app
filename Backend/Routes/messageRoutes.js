import express from "express";
import { sendMesaage } from "../Controller/messageController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/send/:id").post(protectRoute, sendMesaage);

export default router;
