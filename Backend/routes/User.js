import { Router } from "express";
import verifyToken from "../middlewares/verifyToken.js";
import {
  forgotPassword,
  login,
  logout,
  signup,
  getUserProfile,
  changePassword,
  verifyOtp
} from "../controllers/userController.js";
import upload from "../middlewares/upload.js";
import passport from "passport";
import jwt from "jsonwebtoken";
import User from "../models/UserModel.js";   
import sendOtpEmail from "../config/mailer.js";  

const userRoute = Router();

// user routes
userRoute.post("/login", login);
userRoute.post("/verify-otp", verifyOtp);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/logout", verifyToken, logout);
userRoute.post("/signup", upload.single("profileImage"), signup);
userRoute.get("/profile", verifyToken, getUserProfile);
userRoute.post("/changePassword", verifyToken, changePassword);

userRoute.post("/send-otp", async (req, res) => {
  try {
    const { UserEmail } = req.body;   // ✅ match frontend
    const otp = Math.floor(100000 + Math.random() * 900000);

    const user = await User.findOne({ email: UserEmail });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.otp = otp;
    user.otpExpiry = Date.now() + 5 * 60 * 1000;
    await user.save();

    await sendOtpEmail(UserEmail, otp);

    res.json({ success: true, message: "OTP sent successfully" });
  } catch (error) {
    console.error("OTP Error:", error);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});

userRoute.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);



userRoute.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login", session: false }),
  (req, res) => {
    if (!req.user) return res.redirect(`${process.env.FRONTEND_URL}/login`);

    const token = jwt.sign(
      { id: req.user._id, email: req.user.email, name: req.user.Name, role: req.user.role },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "7d" }
    );

    res.redirect(
      `${process.env.FRONTEND_URL}/oauth-success?token=${token}&name=${req.user.Name}&email=${req.user.email}&role=${req.user.role}`
    );
  }
);



export default userRoute;
