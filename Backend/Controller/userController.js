import { asyncHandler } from "../Helpers/asyncHandler.js";
import generateTokenAndSetCookies from "../Helpers/generateToken.js";
import User from "../Model/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const createUser = asyncHandler(async (req, res, next) => {
  const { name, userName, password, confirmPassword, gender } = req?.body;

  if (password !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const existingUser = await User.findOne({ userName });

  if (existingUser)
    return res.status(400).json({ message: "User already exists" });

  let filepath;
  if (req?.file) {
    filepath = req.file.path.replace(/\\/g, "/");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const user = new User({
    name,
    userName,
    gender,
    password: hashedPassword,
    profileImage: filepath,
  });

  if (user) {
    generateTokenAndSetCookies(user._id, res);
    await user.save();
  } else {
    return res.status(400).json({ message: "Failed to create user" });
  }

  res.status(201).json({
    status: "success",
    message: "User created successfully",
    data: {
      user,
    },
  });
});

export const loginUser = asyncHandler(async (req, res, next) => {
  const { userName, password } = req?.body;
  const user = await User.findOne({ userName }).select("+password");

  if (!user) {
    return res
      .status(401)
      .json({ message: "user not found with this username" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid password" });
  }

  generateTokenAndSetCookies(user._id, res);

  return res.json({
    status: "success",
    message: "Logged in successfully",
    data: {
      user,
    },
  });
});

export const logout = async (req, res, next) => {
  try {
    res.cookie("token", "", { maxAge: 0 });
    res.json({ status: "success", message: "Logged out successfully" });
  } catch {
    res.status(500).json({ status: "error", message: "Failed to log out" });
  }
};
