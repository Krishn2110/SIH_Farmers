import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sendOtpEmail = async (to, otp) => {
  try {
    const info = await transporter.sendMail({
      from: `"Agri App 🌾" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Your OTP Code",
      html: `
    <h2>Welcome to Agri App 🌾</h2>
    <p>Your OTP is: <b>${otp}</b></p>
    <p>This OTP is valid for 5 minutes.</p>
    <p>If you didn’t request this, please ignore this email.</p>
  `,
    });

    console.log("✅ OTP email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error("❌ Error sending OTP:", err);
    throw err;
  }
};


export default sendOtpEmail;