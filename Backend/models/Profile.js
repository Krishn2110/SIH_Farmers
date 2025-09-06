import mongoose from "mongoose";

const profileSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, ref: "UserDetails" },
  Name: String,
  email: String,
  phone: String,
  role: { type: String, default: "user" },
  title: String,
  location: String,
  farmsManaged: String,
  experienceYears: String,
  crops: [String],
  profileImage: String,
  joinDate: String,
  loginHistory: [{ date: String, time: String }],
  lastLogin: Date,
  isLogin: Boolean,
});

export default mongoose.model("Profile", profileSchema);
