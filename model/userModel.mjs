import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "user"], default: "user" },
  contactNumber: { type: String, default: "" },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    default: null, // ya default: "" dono chalenge
    required: false, // 👈 explicitly not required
  },

  avatar: { type: String, default: "" }, // optional image URL
});

const User = mongoose.model("User", userSchema);
export default User;
