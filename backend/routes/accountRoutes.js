const { startSession } = require("mongoose");
const authenticateUser = require("../auth/userAuth");
const Account = require("../models/accountModel");
const { transferSchema } = require("../schema/userSchema");
const { validateInputs } = require("../validations/userInputValidations");

const router = require("express").Router();

router.get("/balance", authenticateUser, async (req, res) => {
  const account = await Account.findOne({
    userId: req.id,
  });
  return res.status(200).json({ balance: account.balance });
});

router.post(
  "/transfer",
  authenticateUser,
  validateInputs(transferSchema),
  async (req, res) => {
    const session = await startSession();
    session.startTransaction();

    const reciversAccount = await Account.findOne({
      userId: req.userDetails.to,
    }).session(session);

    if (!reciversAccount) {
      await session.abortTransaction();
      return res.status(400).json({ message: "Invalid account" });
    }
    const sendersAccount = await Account.findOne({
      userId: req.id,
    }).session(session);
    if (!sendersAccount || sendersAccount.balance < req.userDetails.ammount) {
      await session.abortTransaction();
      return res.status(200).json({ message: "Insufficient funds" });
    }
    await Account.findOneAndUpdate(
      { userId: req.id },
      { $inc: { balance: -req.userDetails.ammount } }
    ).session(session);
    await Account.findOneAndUpdate(
      {
        userId: req.userDetails.to,
      },
      { $inc: { balance: req.userDetails.ammount } }
    ).session(session);
    await session.commitTransaction();
    return res.status(200).json({ message: "Transfer Successful" });
  }
);

module.exports = router;
