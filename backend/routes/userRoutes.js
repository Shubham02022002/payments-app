const router = require("express").Router();
const z = require("zod");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticateUser = require("../auth/userAuth");

const userSchema = z.object({
  username: z.string().min(3),
  password: z.string().min(7),
});

const validInputs = (req, res, next) => {};

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  try {
    const validInputs = userSchema.safeParse({ username, password });
    if (!validInputs.success) {
      return res.status(400).json({ message: "Invalid inputs" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({ username, password: hashedPassword });
    const token = jwt.sign({ userId: newUser._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    return res.status(200).json({
      message: "User SignedUp successfully",
      token: `Bearer ${token}`,
    });
  } catch (error) {
    if (error.code == 1100) {
      return res.status(409).json({ message: "Username already exists" });
    }
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signin", async (req, res) => {
  const { username, password } = req.body;
  try {
    const validInputs = userSchema.safeParse({ username, password });
    if (!validInputs.success) {
      return res.status(400).json({ message: "Invalid inputs" });
    }
    const isUser = await User.findOne({ username });
    const isValidPassword = await bcrypt.compare(password, isUser.password);
    if (isUser && isValidPassword) {
      const token = jwt.sign({ userId: isUser._id }, process.env.SECRET, {
        expiresIn: "1h",
      });
      res
        .status(200)
        .json({ message: "Logged in successflly", token: `Bearer ${token}` });
    } else {
      return res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/editProfile", authenticateUser, async (req, res) => {
  const { newUserName, newPassword } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const updatedUser = await User.findByIdAndUpdate(
      req.id,
      {
        username: newUserName,
        password: hashedPassword,
      },
      {
        new: true,
      }
    );
    res.status(200).json({ message: "Details updated", id: updatedUser._id });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
