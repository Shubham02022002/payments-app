const router = require("express").Router();
const z = require("zod");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const authenticateUser = require("../auth/userAuth");
const {
  signinSchema,
  editProfileSchema,
  signupSchema,
} = require("../schema/userSchema");
const { validateInputs } = require("../validations/userInputValidations");
const Account = require("../models/accountModel");

router.post("/signup", validateInputs(signupSchema), async (req, res) => {
  const { username, password, firstName, lastName } = req.userDetails;
  try {
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(411).json({ message: "User already exits" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
    });

    await Account.create({
      userId: newUser._id,
      balance: Math.floor(Math.random() * 9999 + 1),
    });
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
    console.log("ctrl here");
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

router.post("/signin", validateInputs(signinSchema), async (req, res) => {
  const { username, password } = req.userDetails;
  try {
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

router.post(
  "/editProfile",
  authenticateUser,
  validateInputs(editProfileSchema),
  async (req, res) => {
    try {
      const updatedData = {};
      const { username, password, firstName, lastName } = req.userDetails;

      if (username) updatedData.username = username;
      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
      }
      if (firstName) updatedData.firstName = firstName;
      if (lastName) updatedData.lastName = lastName;

      const updatedUser = await User.findByIdAndUpdate(req.id, updatedData, {
        new: true,
        runValidators: true,
      });
      return res.status(200).json({
        message: "Details updated",
        user: updatedUser,
      });
    } catch (error) {
      if (error.code === 11000) {
        return res.status(409).json({ message: "Username already exists" });
      }
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
);

router.get("/bulk", authenticateUser, async (req, res) => {
  const searchKeyword = req.query.filter;
  const regex = new RegExp(searchKeyword, "i");
  const users = await User.find({
    $or: [{ username: regex }, { firstName: regex }, { lastName: regex }],
  }).exec();
  return res.status(200).json({
    users: users.map((user) => ({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
    })),
  });
});

module.exports = router;
