const jwt = require("jsonwebtoken");
const User = require("../models/userSchema");
require("dotenv").config();

const authMiddleware = async (req, res, next) => {
  try {
    const authToken = req.headers.authorization?.split(" ")[1];
    if (!authToken) {
      return res.status(401).json({
        status: false,
        message: "Authentication required",
      });
    }
    const decoded = jwt.verify(authToken, process.env.SECRET);
    const user = await User.findOne({
      email: decoded.email,
    });
    if (!user) {
      return res.status(401).json({
        status: false,
        message: "User no longer exists",
      });
    }
    req.user = user;
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({
      status: false,
      message: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
