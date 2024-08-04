import jwt from "jsonwebtoken";
import User from "../Model/userModel.js";

export const protectRoute = async (req, res, next) => {
  let token ;
  if (req?.headers?.authorization && req?.headers?.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(401).json({ status: "error", message: "Not authorized" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    let user = await User.findById({ _id: decoded.userId });
    if (!user) {
      return res
        .status(401)
        .json({ status: "error", message: "Invalid Token" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ status: "error", message: "Not authorized" });
  }
};
