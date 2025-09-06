import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import userDetails from "../models/UserModel.js";
import Otp from "../models/Otp.js";
import nodemailer from "nodemailer";
import Profile from "../models/Profile.js";

// 🔹 JWT Token Creator
// const createToken = (user) => {
//   return jwt.sign(
//     {
//       id: user._id,
//       email: user.email,
//       name: user.Name,
//     },
//     process.env.JWT_TOKEN_KEY,
//     { expiresIn: "1h" }
//   );
// };

const createToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.Name, role: user.role || "user" },
    process.env.JWT_TOKEN_KEY,
    { expiresIn: "8h" }
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

// const signup = async (req, res) => {
//   try {
//     const { UserName, UserEmail, Password } = req.body;
//     if (!UserName || !UserEmail || !Password) {
//       return res.status(400).json({ message: "Please fill all details" });
//     }

//     const existingUser = await userDetails.findOne({ email: UserEmail });
//     if (existingUser) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const hashedPassword = await bcrypt.hash(Password, 13);

//     const userData = {
//       Name: UserName,
//       email: UserEmail,
//       Password: hashedPassword,
//     };

//     // Add profile image if uploaded
//     if (req.file) {
//       userData.profileImage = `/uploads/${req.file.filename}`;
//     }

//     const user = await userDetails.create(userData);

//     // 🔹 Generate OTP
//     const otp = Math.floor(100000 + Math.random() * 900000).toString();
//     const expiresAt = new Date(Date.now() + 5 * 60 * 1000);

//     await Otp.create({ email: UserEmail, otp, expiresAt });

//     // 🔹 Send OTP Email
//     await transporter.sendMail({
//       from: `"Agri App 🌾" <${process.env.EMAIL_USER}>`,
//       to: UserEmail,
//       subject: "Verify Your Account - OTP",
//       html: `<h3>Your OTP is: <b>${otp}</b></h3><p>Expires in 5 minutes.</p>`,
//     });

//     return res.status(200).json({
//       success: true,
//       message: "Signup successful. Please verify OTP sent to email.",
//     });
//   } catch (e) {
//     return res.status(500).json({ message: "Server Error!", error: e.message });
//   }
// };


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

    const userData = {
      Name: UserName,
      email: UserEmail,
      Password: hashedPassword,
    };

    // Add profile image if uploaded
    if (req.file) {
      userData.profileImage = `/uploads/${req.file.filename}`;
    }

    const user = await userDetails.create(userData);

    // 🔹 Create Profile document immediately
    const profileData = {
      _id: user._id, // link profile with user _id
      Name: user.Name,
      email: user.email,
      phone: user.phoneNumber || null,
      role: user.role || "user",
      title: "Farmer",
      location: "India",
      farmsManaged: "1 farm",
      experienceYears: "1+ years",
      crops: [],
      profileImage: user.profileImage || null,
      joinDate: new Date().toLocaleString("en-IN", { month: "long", year: "numeric" }),
      loginHistory: [],
      lastLogin: null,
      isLogin: false,
    };

    await Profile.create(profileData);

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





// const login = async (req, res) => {
//   try {
//     const { UserEmail, Password, UserRole } = req.body;

//     const user = await userDetails.findOne({ email: UserEmail });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const isPasswordValid = await bcrypt.compare(Password, user.Password);
//     if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

//     // Farmer OTP login
//     if (UserRole === "farmer") {
//       const otp = Math.floor(100000 + Math.random() * 900000).toString();
//       const expiresAt = new Date(Date.now() + 5 * 60 * 1000);
//       await Otp.create({ email: UserEmail, otp, expiresAt });

//       await transporter.sendMail({
//         from: `"Agri App 🌾" <${process.env.EMAIL_USER}>`,
//         to: UserEmail,
//         subject: "Login OTP",
//         html: `<h3>Your Login OTP is: <b>${otp}</b></h3><p>Expires in 5 minutes.</p>`,
//       });

//       return res.status(200).json({ message: "OTP sent for login", requireOtp: true });
//     }

//     // Update Profile: lastLogin and loginHistory
//     const profile = await Profile.findById(mongoose.Types.ObjectId(user._id));

//     if (!profile) {
//       console.error("Profile not found for user:", user._id);
//       return res.status(404).json({ message: "Profile not found" });
//     }

//     const previousLogin = profile.lastLogin || null;
//     const now = new Date();
//     const formattedDate = now.toLocaleDateString("en-IN");
//     const formattedTime = now.toLocaleTimeString("en-IN");

//     profile.lastLogin = now;
//     profile.isLogin = true;
//     profile.loginHistory.push({ date: formattedDate, time: formattedTime });

//     // Keep last 10 login entries
//     if (profile.loginHistory.length > 10) profile.loginHistory.shift();

//     await profile.save();
//     console.log("Profile updated:", profile);

//     // Generate JWT
//     const token = createToken(user);

//     res.status(200).json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: {
//         id: profile._id,
//         name: profile.Name,
//         email: profile.email,
//         phone: profile.phone,
//         role: profile.role,
//         profileImage: profile.profileImage,
//         lastLogin: previousLogin,
//         currentLogin: profile.lastLogin,
//         loginHistory: profile.loginHistory,
//       }
//     });

//   } catch (e) {
//     console.error("Login error:", e);
//     res.status(500).json({ message: "Server error", error: e.message });
//   }
// };


const login = async (req, res) => {
  try {
    const { UserEmail, Password, UserRole } = req.body;
    const user = await userDetails.findOne({ email: UserEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const isPasswordValid = await bcrypt.compare(Password, user.Password);
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid password" });

    // Farmer OTP login (skip direct login, handled in verifyOtp)
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

      return res.status(200).json({ message: "OTP sent for login", requireOtp: true });
    }

    // ✅ Update UserDetails & Profile both
    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN");
    const formattedTime = now.toLocaleTimeString("en-IN");

    await userDetails.findByIdAndUpdate(user._id, {
      $set: { lastLogin: now, isLogin: true },
      $push: { loginHistory: { date: formattedDate, time: formattedTime } }
    });

    const profile = await Profile.findByIdAndUpdate(
      user._id,
      {
        $set: { lastLogin: now, isLogin: true },
        $push: { loginHistory: { date: formattedDate, time: formattedTime } }
      },
      { new: true }
    );

    const token = createToken(user);

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: {
        id: profile._id,
        name: profile.Name,
        email: profile.email,
        phone: profile.phone,
        role: profile.role,
        profileImage: profile.profileImage,
        lastLogin: profile.lastLogin,
        loginHistory: profile.loginHistory,
      }
    });
  } catch (e) {
    console.error("Login error:", e);
    res.status(500).json({ message: "Server error", error: e.message });
  }
};




// const verifyOtp = async (req, res) => {
//   try {
//     const { UserEmail, otp } = req.body;

//     // ✅ always fetch the latest OTP
//     const record = await Otp.findOne({ email: UserEmail, otp }).sort({ expiresAt: -1 });
//     if (!record) return res.status(400).json({ message: "Invalid OTP" });

//     if (record.expiresAt.getTime() < Date.now()) {
//       return res.status(400).json({ message: "OTP expired" });
//     }

//     const user = await userDetails.findOne({ email: UserEmail });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const token = createToken(user);
//     await Otp.deleteMany({ email: UserEmail }); // ✅ cleanup after success


//     return res.status(200).json({
//       success: true,
//       message: "OTP verified successfully",
//       token,
//       role: user.role || "farmer",
//       user: { name: user.Name, email: user.email },
//     });

    
//   } catch (e) {
//     return res.status(500).json({ message: "OTP verification failed", error: e.message });
//   }
// };


const verifyOtp = async (req, res) => {
  try {
    const { UserEmail, otp } = req.body;
    const record = await Otp.findOne({ email: UserEmail, otp }).sort({ expiresAt: -1 });
    if (!record) return res.status(400).json({ message: "Invalid OTP" });
    if (record.expiresAt.getTime() < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const user = await userDetails.findOne({ email: UserEmail });
    if (!user) return res.status(404).json({ message: "User not found" });

    const now = new Date();
    const formattedDate = now.toLocaleDateString("en-IN");
    const formattedTime = now.toLocaleTimeString("en-IN");

    await userDetails.findByIdAndUpdate(user._id, {
      $set: { lastLogin: now, isLogin: true },
      $push: { loginHistory: { date: formattedDate, time: formattedTime } }
    });

    const profile = await Profile.findByIdAndUpdate(
      user._id,
      {
        $set: { lastLogin: now, isLogin: true },
        $push: { loginHistory: { date: formattedDate, time: formattedTime } }
      },
      { new: true }
    );

    const token = createToken(user);
    await Otp.deleteMany({ email: UserEmail });

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      token,
      role: user.role || "farmer",
      user: {
        name: profile.Name,
        email: profile.email,
        lastLogin: profile.lastLogin,
        loginHistory: profile.loginHistory
      }
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
     await Profile.updateOne({ _id: user.id }, { isLogin: false })
    return res.status(200).json({ message: "Logout successful" });
  } catch (e) {
    return res.status(500).json({ message: "Logout failed", error: e.message });
  }
};


const getUserProfile = async (req, res) => {
  try {
    const user = await Profile.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      user: {
        id: user._id,
        name: user.Name,
        email: user.email,
        phone: user.phoneNumber || null,
        role: user.role || "user",
        title: user.title || "Farmer",
        location: user.location || "India",
        farmsManaged: user.farmsManaged || "1 farm",
        experienceYears: user.experienceYears || "1+ years",
        crops: Array.isArray(user.crops) ? user.crops : [],
        profileImage: user.profileImage || null,
        joinDate: user.joinDate || "September 2025",
        lastLogin: user.lastLogin || null,
        loginHistory: Array.isArray(user.loginHistory) ? user.loginHistory : [],
      },
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



const profile = async (req, res) => {
  try {
    const user = await userDetails.findById(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json({
      user: {
        id: user._id,
        name: user.Name,
        email: user.email,
        phone: user.phoneNumber,
        role: user.role,
        profileImage: user.profileImage,
        lastLogin: user.lastLogin,
        loginHistory: user.loginHistory || []
      }
    });
  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ message: "Server error" });
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
  profile
};
