import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      select: false,
    },
    tokenVersion: {
      type: Number,
      default: 0,
    },
    upiId: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
      lowercase: true,
    },

    phone: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      unique: true,
      validate: {
        validator: function (v) {
          return /^\+?[1-9]\d{1,14}$/.test(v);
        },
        message: (props) =>
          `${props.value} is not a valid phone number format!`,
      },
    },
    walletBalance: {
      type: Number,
      required: true,
      default: 0,
      min: [0, "Wallet balance cannot be negative"],
    },
    currency: {
      type: String,
      default: "INR",
      enum: ["INR", "USD"],
    },
    kycStatus: {
      type: String,
      enum: ["PENDING", "VERIFIED", "REJECTED"],
      default: "PENDING",
    },
    isAccountLocked: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.index({ phone: 1, upiId: 1 });

const User = mongoose.model("User", userSchema);
export default User;
