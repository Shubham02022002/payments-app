const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const Account = require("../models/accountSchema");
const { transferFundsSchema } = require("../vaidation");
const { default: mongoose } = require("mongoose");
const accountRouter = express.Router();

accountRouter.get("/balance", authMiddleware, async (req, res) => {
  const userAccount = await Account.findOne({ userId: req.user._id });
  const balance = userAccount.balance;
  return res.status(200).json({
    success: true,
    balance,
  });
});

accountRouter.post("/transfer", authMiddleware, async (req, res) => {
  const response = transferFundsSchema.safeParse(req.body);
  if (!response.success) {
    return res.status(400).json({
      success: false,
      message: "Invalid Inputs",
    });
  }

  const { to, amount } = req.body;

  if (to === req.user._id.toString()) {
    return res.status(400).json({
      success: false,
      message: "Cannot transfer funds to yourself",
    });
  }
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const account = await Account.findOne({ userId: req.user._id }).session(
      session,
    );
    const toAccount = await Account.findOne({ userId: to }).session(session);
    if (account.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        message: "Insufficient balance",
      });
    }
    if (!toAccount) {
      await session.abortTransaction();
      return res.status(404).json({
        success: false,
        message: "Account doesn't exists",
      });
    }

    await Account.updateOne(
      { userId: req.user._id },
      {
        $inc: {
          balance: -amount,
        },
      },
    ).session(session);
    await Account.updateOne(
      { userId: to },
      {
        $inc: {
          balance: amount,
        },
      },
    ).session(session);

    await session.commitTransaction();

    return res.status(200).json({
      success: true,
      message: "Transfer Successful",
    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transfer error:", error);

    return res.status(500).json({
      success: false,
      message: "Transfer failed",
    });
  } finally {
    await session.endSession();
  }
});

module.exports = accountRouter;
