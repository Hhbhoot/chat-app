import express from "express";
import { createUser, loginUser } from "../Controller/userController.js";
import upload from "../Helpers/ProfileUpload.js";

const router = express.Router();

router.route("/signup").post(upload.single("profileImage"), createUser);
router.route("/login").post(loginUser);

export default router;
