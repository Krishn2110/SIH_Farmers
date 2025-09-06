import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import session from "express-session";
import passport from "passport";
import "./config/passport.js";
import userRoute from "./routes/User.js";
import connectDB from "./config/mongo.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";



const app = express();


app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5173", // frontend
  credentials: true,
}));

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecret",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
// app.use(passport.session());

app.use("/api/auth", userRoute);
// app.use("/auth", userRoute);
app.use("/api/feedback", feedbackRoutes);


connectDB();

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
