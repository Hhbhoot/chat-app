import express from "express";
import { createUser, loginUser, logout, validate } from "../Controller/authController.js";
import upload from "../Helpers/ProfileUpload.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/signup").post(upload.single("profileImage"), createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);
router.route("/check").post(protectRoute,validate)

export default router;
