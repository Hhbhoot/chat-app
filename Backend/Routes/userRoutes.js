import express from "express";
import { protectRoute } from "../middleware/authMiddleware.js";
import { getUserforSidebar } from "../Controller/userController.js";

const router = express.Router();

router.route("/").get(protectRoute, getUserforSidebar);

export default router;
