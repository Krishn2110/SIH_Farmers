import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: function () {
        return !this.phoneNumber; // email required if no phone
      },
    },
    phoneNumber: {
      type: String,
      required: function () {
        return !this.email; // phone required if no email
      },
    },
    otp: {
      type: String,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  { timestamps: true }
);

// ✅ Validation to ensure at least one (email or phone) is present
otpSchema.pre("save", function (next) {
  if (!this.email && !this.phoneNumber) {
    return next(new Error("Either email or phoneNumber is required"));
  }
  next();
});

const Otp = mongoose.model("Otp", otpSchema);
export default Otp;
