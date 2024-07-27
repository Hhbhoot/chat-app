import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    userName: {
      type: String,
      required: true,
      unique: true,
      minlength: 6,
    },

    password: {
      type: String,
      required: true,
      minlength: 8,
      select: false,
    },

    gender: {
      type: String,
      enum: ["male", "female", "other"],
      required: true,
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);

export default User;
