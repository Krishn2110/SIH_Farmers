import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    subject: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "General Feedback",
        "Bug Report",
        "Feature Request",
        "User Experience",
        "Performance",
        "Support",
        "Partnership",
        "Other",
      ],
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    message: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
      enum: ["Excellent", "Good", "Average", "Poor", "Very Poor"],
    },
    suggestions: {
      type: String,
      default: "",
    },
    contactPreference: {
      type: String,
      enum: ["email", "phone", "none"],
      default: "email",
    },
  },
  {
    timestamps: true, // automatically adds createdAt & updatedAt
  }
);

const Feedback = mongoose.model("Feedback", feedbackSchema);

export default Feedback;
