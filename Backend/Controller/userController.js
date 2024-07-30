import User from "../Model/userModel.js";

export const getUserforSidebar = async (req, res) => {
  const loggedInUser = req?.user?._id;
  const users = await User.find({ _id: { $ne: loggedInUser } });

  if (!users) {
    return res.status(200).json([]);
  }

  res.status(200).json({
    status: "success",
    data: users,
    message: "Users fetched successfully",
  });
};
