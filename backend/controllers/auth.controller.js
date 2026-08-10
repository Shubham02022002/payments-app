import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  try {
    const { username, email, phone, age, password } = req.body;
    const isExistingUser = await User.findOne({
      $or: [{ email }, { phone }],
    });
    if (isExistingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email or phone number already exists.",
      });
    }
    const newUser = await User.create({
      username,
      email,
      phone,
      age,
      password,
    });

    const token = jwt.sign(
      { userId: newUser._id, tokenVersion: newUser.tokenVersion },
      process.env.SECRET,
      { expiresIn: "2d" },
    );

    return res.status(201).json({
      success: true,
      message: "Account created successfully!",
      data: {
        userId: newUser._id,
        username: newUser.username,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "An account with this email or phone number already exists.",
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }
    const token = jwt.sign(
      { userId: user._id, tokenVersion: user.tokenVersion },
      process.env.SECRET,
      { expiresIn: "2d" },
    );
    return res.status(200).json({
      success: true,
      message: "Login successful!",
      data: {
        userId: user._id,
        username: user.username,
        token: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
