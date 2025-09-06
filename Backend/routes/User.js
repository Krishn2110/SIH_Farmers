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
import userDetails from "../models/UserModel.js";   
import sendOtpEmail from "../config/mailer.js";  
import twilio from "twilio";
import Otp from "../models/Otp.js"; 
import bcrypt from "bcrypt";
import Prediction from "../models/Prediction.js";
import User from "../models/UserModel.js";

const userRoute = Router();

// user routes
userRoute.post("/login", login);
userRoute.post("/verify-otp", verifyOtp);
userRoute.post("/forgotPassword", forgotPassword);
userRoute.post("/logout", verifyToken, logout);
userRoute.post("/signup", upload.single("profileImage"), signup);
userRoute.get("/profile", verifyToken, getUserProfile);
userRoute.post("/changePassword", verifyToken, changePassword);

// userRoute.post("/send-otp", async (req, res) => {
//   try {
//     const { userDetailsEmail } = req.body;   // ✅ match frontend
//     const otp = Math.floor(100000 + Math.random() * 900000);

//     const user = await userDetails.findOne({ email: userDetailsEmail });
//     if (!user) return res.status(404).json({ success: false, message: "userDetails not found" });

//     user.otp = otp;
//     user.otpExpiry = Date.now() + 5 * 60 * 1000;
//     await user.save();

//     await sendOtpEmail(userDetailsEmail, otp);

//     res.json({ success: true, message: "OTP sent successfully" });
//   } catch (error) {
//     console.error("OTP Error:", error);
//     res.status(500).json({ success: false, message: "Failed to send OTP" });
//   }
// });


userRoute.post("/send-otp", async (req, res) => {
  try {
    const { userDetailsEmail } = req.body;
    if (!userDetailsEmail) {
      return res.status(400).json({ success: false, message: "Email is required" });
    }

    const user = await userDetails.findOne({ email: userDetailsEmail });
    if (!user) {
      return res.status(404).json({ success: false, message: "userDetails not found" });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save in Otp collection
    await Otp.create({ email: userDetailsEmail, otp, expiresAt });

    // Send OTP via email
    await sendOtpEmail(userDetailsEmail, otp);

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

const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

// Send Phone OTP
userRoute.post("/send-phone-otp", async (req, res) => {
  try {
    const { phone } = req.body;
    if (!phone) return res.status(400).json({ message: "Phone is required" });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

    // Save OTP in DB
    await Otp.create({ phoneNumber: phone, otp, expiresAt }); // ✅ match schema

    await client.messages.create({
      body: `Your OTP is ${otp}. It expires in 5 minutes.`,
      from: process.env.TWILIO_PHONE,
      to: `+91${phone}`,
    });

    res.json({ success: true, message: "OTP sent to phone" });
  } catch (err) {
    console.error("Twilio OTP Error:", err);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
});


// userRoute.post("/verify-phone-otp", async (req, res) => {
//   try {
//     const { phone, otp, name, password } = req.body;

//     if (!phone || !otp) {
//       return res.status(400).json({ message: "Phone and OTP are required" });
//     }

//     // 1. Find OTP record
//     const record = await Otp.findOne({ phoneNumber: phone, otp }).sort({ expiresAt: -1 });
//     if (!record) return res.status(400).json({ message: "Invalid OTP" });

//     if (record.expiresAt.getTime() < Date.now()) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     // 2. Find existing user
//     let user = await userDetails.findOne({ phoneNumber: phone }); // ✅ FIX

//     if (!user) {
//       const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

//       user = new userDetails({
//         phoneNumber: phone, // ✅ FIX
//         Name: name || "New userDetails",
//         Password: hashedPassword, // ✅ match your schema (capital P)
//       });

//       if (req.file) {
//         user.profileImage = `/uploads/${req.file.filename}`;
//       }

//       await user.save();
//     }

//     // 3. Generate JWT
//     const token = jwt.sign(
//       { id: user._id, phone: user.phoneNumber }, // ✅ FIX
//       process.env.JWT_TOKEN_KEY,
//       { expiresIn: "7d" }
//     );

//     // 4. Clean up OTPs
//     await Otp.deleteMany({ phoneNumber: phone });

//     res.json({
//       success: true,
//       message: "Phone verified successfully",
//       token,
//       user: { id: user._id, phone: user.phoneNumber, name: user.Name },
//     });
//   } catch (err) {
//     console.error("Verify Phone OTP Error:", err);
//     res.status(500).json({ message: "OTP verification failed", error: err.message });
//   }
// }); 



userRoute.post("/verify-phone-otp", async (req, res) => {
  try {
    let { phone, otp, name, password } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ message: "Phone and OTP are required" });
    }

    // Ensure strings & trim
    phone = phone.toString().trim();
    otp = otp.toString().trim();

    // 1. Find latest OTP record for this phone
    const record = await Otp.findOne({ phoneNumber: phone, otp }).sort({ createdAt: -1 });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });

    // 2. Check expiry
    if (record.expiresAt.getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    } 

    // 3. Find or create user
    let user = await userDetails.findOne({ phoneNumber: phone });
    if (!user) {
      if (!password) {
        return res.status(400).json({ message: "Password is required for signup via phone" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      user = new userDetails({
        phoneNumber: phone,
        Name: name || "New userDetails",
        Password: hashedPassword,
      });

      if (req.file) {
        user.profileImage = `/uploads/${req.file.filename}`;
      }

      await user.save();
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { id: user._id, phone: user.phoneNumber },
      process.env.JWT_TOKEN_KEY,
      { expiresIn: "7d" }
    );

    // 5. Delete used OTP
    await Otp.deleteMany({ phoneNumber: phone });

    res.json({
      success: true,
      message: "Phone verified successfully",
      token,
      user: { id: user._id, phone: user.phoneNumber, name: user.Name },
    });
  } catch (err) {
    console.error("Verify Phone OTP Error:", err);
    res.status(500).json({ message: "OTP verification failed", error: err.message });
  }
});




export default userRoute;
