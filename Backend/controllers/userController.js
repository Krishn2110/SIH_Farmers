import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userDetails from "../models/UserModel.js";
import Otp from "../models/Otp.js";
import nodemailer from "nodemailer";

// 🔹 JWT Token Creator
const createToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      name: user.Name,
    },
    process.env.JWT_TOKEN_KEY,
    { expiresIn: "1h" }
  );
};

// 🔹 Nodemailer Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const signup = async (req, res) => {
  try {
    const { UserName, UserEmail, Password } = req.body;
    if (!UserName || !UserEmail || !Password) {
      return res.status(400).json({ message: "Please fill all details" });
    }

    const existingUser = await userDetails.findOne({ email: UserEmail });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(Password, 13);

    const user = await userDetails.create({
      Name: UserName,
      email: UserEmail,
      Password: hashedPassword,
    });

    // 🔹 Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    await Otp.create({ email: UserEmail, otp, expiresAt });

    // 🔹 Send OTP Email
    await transporter.sendMail({
      from: `"Agri App 🌾" <${process.env.EMAIL_USER}>`,
      to: UserEmail,
      subject: "Verify Your Account - OTP",
      html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Expires in 5 minutes.</p>`,
    });

    return res.status(200).json({
      success: true,
      message: "Signup successful. Please verify OTP sent to email.",
    });
  } catch (e) {
    return res.status(500).json({ message: "Server Error!", error: e.message });
  }
};

const login = async (req, res) => {
  try {
    const { UserEmail, Password, UserRole } = req.body;

const user = await userDetails.findOne({ email: UserEmail });
if (!user) return res.status(404).json({ message: "User not found" });

const ComparePassword = await bcrypt.compare(Password, user.Password);
if (!ComparePassword)
  return res.status(401).json({ message: "Invalid password" });

    if (UserRole === "farmer") {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

  await Otp.create({ email: UserEmail, otp, expiresAt });

  await transporter.sendMail({
    from: `"Agri App 🌾" <${process.env.EMAIL_USER}>`,
    to: UserEmail,
    subject: "Login OTP",
    html: `<h3>Your Login OTP is: <b>${otp}</b></h3><p>Expires in 5 minutes.</p>`,
  });

  return res.status(200).json({ message: "OTP sent for login" });
}


    // 🔹 Admin direct login
    const token = createToken(user);
    return res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
      user: { name: user.Name, email: user.email },
    });
  } catch (e) {
    return res.status(500).json({ message: "Server Error", error: e.message });
  }
};



const verifyOtp = async (req, res) => {
  try {
    const { UserEmail, otp } = req.body;

    // ✅ always fetch the latest OTP
    const record = await Otp.findOne({ email: UserEmail, otp }).sort({ expiresAt: -1 });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    if (record.expiresAt.getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const user = await userDetails.findOne({ email: UserEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = createToken(user);
    await Otp.deleteMany({ email: UserEmail }); // ✅ cleanup after success

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      role: user.role || "farmer",
      user: { name: user.Name, email: user.email },
    });
  } catch (e) {
    return res.status(500).json({ message: "OTP verification failed", error: e.message });
  }
};


const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await userDetails.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 🔹 Send OTP for reset
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
    await Otp.create({ email, otp, expiresAt });

    await transporter.sendMail({
      from: `"Agri App 🌾" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Password Reset OTP",
      html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Expires in 5 minutes.</p>`,
    });

    return res.status(200).json({ message: "OTP sent for password reset" });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;

    const record = await Otp.findOne({ email, otp });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });
    if (record.expiresAt < new Date())
      return res.status(400).json({ message: "OTP expired" });

    const hashedPassword = await bcrypt.hash(newPassword, 13);
    await userDetails.updateOne({ email }, { Password: hashedPassword });
    await Otp.deleteMany({ email });

    return res.status(200).json({ message: "Password reset successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Server error", error: e.message });
  }
};

const logout = async (req, res) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");
    const user = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    await userDetails.updateOne({ _id: user.id }, { isLogin: false });
    return res.status(200).json({ message: "Logout successful" });
  } catch (e) {
    return res.status(500).json({ message: "Logout failed", error: e.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await userDetails.findById(req.user.id).select("Name email lastLogin");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.status(200).json({ user });
  } catch (e) {
    return res.status(500).json({ message: "Profile fetch failed", error: e.message });
  }
};

const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await userDetails.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.Password);
    if (!isMatch) return res.status(400).json({ message: "Old password incorrect" });

    user.Password = await bcrypt.hash(newPassword, 13);
    await user.save();

    return res.status(200).json({ message: "Password changed successfully" });
  } catch (e) {
    return res.status(500).json({ message: "Password change failed", error: e.message });
  }
};

export {
  signup,
  login,
  verifyOtp,
  forgotPassword,
  resetPassword,
  logout,
  getUserProfile,
  changePassword,
};
