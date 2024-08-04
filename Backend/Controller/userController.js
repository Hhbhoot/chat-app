import User from "../Model/userModel.js";

export const getUserforSidebar = async (req, res) => {
  const loggedInUser = req?.user?._id;
  const users = await User.find({ _id: { $ne: loggedInUser } });
  
  if (!users) {
    return res.status(200).json([]);
  }
  const totalUser = users ? users.length : 0 

  res.status(200).json({
    status: "success",
    data: {
      users,
      totalUser,
    },
    message: "Users fetched successfully",
  });
};
