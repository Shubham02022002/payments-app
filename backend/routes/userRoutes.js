const router = require("express").Router();
const z = require("zod");
const User = require("../models/userModel");

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
    const newUser = await User.create({ username, password });
    res
      .status(200)
      .json({ message: "User SignedUp successfully", id: newUser._id });
  } catch (error) {
    console.error(error);
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
    const isUser = await User.findOne({ username, password });
    if (isUser) {
      res.status(200).json({ message: "Logged in successflly" });
    } else {
      return res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/editProfile", async (req, res) => {
  const { username, password } = req.headers;
  const { newUserName, newPassword } = req.body;
  try {
    const validInputs = userSchema.safeParse({ username, password });
    if (!validInputs.success) {
      return res.status(400).json({ message: "Invalid inputs" });
    }
    const isUser = await User.findOne({ username, password });
    if (isUser) {
      const updatedUser = await User.findOneAndUpdate(
        { username, password },
        {
          username: newUserName,
          password: newPassword,
        }
      );
      res.status(200).json({ message: "Details updated", id: updatedUser._id });
    } else {
      return res.status(404).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
