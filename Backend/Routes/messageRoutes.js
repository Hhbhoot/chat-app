import express from "express";
import { getMessages, sendMesaage } from "../Controller/messageController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/send/:id").post(protectRoute, sendMesaage);
router.route("/get/:id").get(protectRoute, getMessages);

export default router;
