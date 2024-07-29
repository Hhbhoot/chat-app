import express from "express";
import { createUser, loginUser, logout } from "../Controller/userController.js";
import upload from "../Helpers/ProfileUpload.js";

const router = express.Router();

router.route("/signup").post(upload.single("profileImage"), createUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logout);

export default router;
