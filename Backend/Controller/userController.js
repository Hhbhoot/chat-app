import { asyncHandler } from "../Helpers/asyncHandler.js";
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

  await user.save();

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
  const userId = {
    _id: user._id,
  };
  const token = jwt.sign(userId, process.env.JWT_SECRET, { expiresIn: "7d" });

  return res.json({
    status: "success",
    message: "Logged in successfully",
    data: {
      token,
      user,
    },
  });
});
