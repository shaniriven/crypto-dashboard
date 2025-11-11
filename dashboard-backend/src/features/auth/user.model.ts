import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  onBoarding_done: { type: Boolean, default: false },
  preferences: {
    assets: [String],
    investorType: [String],
    contentTypes: [String]
  }
}, { timestamps: true });

export const User = mongoose.model("User", userSchema);
