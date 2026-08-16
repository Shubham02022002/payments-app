const express = require("express");
const User = require("../models/userSchema");
const userRouter = express().router;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv/config");
const {
  signupSchema,
  loginSchema,
  profileUpdateSchema,
} = require("../vaidation");
const authMiddleware = require("../middleware/authMiddleware");
const Account = require("../models/accountSchema");

userRouter.post("/signup", async (req, res) => {
  const { email, password, userName, firstName, lastName } = req.body;
  const result = signupSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid Inputs",
    });
  }
  const isExistingUser = await User.findOne({ email });
  if (isExistingUser) {
    return res.status(411).json({
      success: false,
      message: "Email already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await User.create({
    firstName,
    lastName,
    userName,
    email,
    password: hashedPassword,
  });

  await Account.create({
    userId: user._id,
    balance: Math.floor(Math.random() * 10000) + 1,
  });
  const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "2d" });
  return res.status(200).json({
    sucess: true,
    userID: user._id,
    token: `Bearer ${token}`,
    message: "User created successfully",
  });
});

userRouter.post("/login", async (req, res) => {
  const { password, email } = req.body;

  const result = loginSchema.safeParse(req.body);
  if (!result.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid Inputs",
    });
  }
  const isValidUser = await User.findOne({ email }).select("+password");
  if (!isValidUser) {
    return res.status(404).json({
      success: false,
      message: "Invalid creds",
    });
  }

  const token = jwt.sign({ email }, process.env.SECRET, { expiresIn: "2d" });
  return res.status(200).json({
    sucess: true,
    userID: isValidUser._id,
    // token: `Bearer ${token}`,
    message: "User logged in successfully",
  });
});

userRouter.put("/update", authMiddleware, async (req, res) => {
  try {
    const result = profileUpdateSchema.safeParse(req.body);
    if (!result.success) {
      const errors = result.error.issues.map((err) => ({
        field: err.path.join("."),
        message: err.message,
      }));

      return res.status(400).json({
        success: false,
        errors: errors,
      });
    }
    await User.updateOne({ email: req.user.email }, req.body);
    return res.status(200).json({
      success: true,
      message: "User profile updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

userRouter.get("/bulk", authMiddleware, async (req, res) => {
  const filter = req.query.filter || "";
  const users = await User.find({
    $or: [
      {
        firstName: {
          $regex: filter,
        },
      },
      {
        lastName: {
          $regex: filter,
        },
      },
    ],
  });

  res.status(200).json({
    status: true,
    user: users
      .filter((u) => u.email !== req.user.email)
      .map((user) => ({
        username: user.userName,
        firstName: user.firstName,
        lastName: user.lastName,
        _id: user._id,
      })),
  });
});

userRouter.get("/me", authMiddleware, async (req, res) => {
  const userAccount = await Account.findOne({ userId: req.user._id });
  return res.status(200).json({
    userName: req.user.userName,
    balance: userAccount.balance,
    status: true,
  });
});

userRouter.post("/logout", (req, res) => {
  localStorage.removeItem("token");
  return res.status(200).json({
    status: true,
    message: "Logged out successfully",
  });
});

module.exports = userRouter;
