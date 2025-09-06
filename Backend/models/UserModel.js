
// import mongoose from "mongoose";

// const userSchema = new mongoose.Schema(
//   {
//     Name: {
//       type: String,
//       required: true,
//     },
//     email: {
//       type: String,
//       required: function () {
//         return !this.phoneNumber;
//       },
//       unique: true,
//       sparse: true,
//     },
//     phoneNumber: {
//       type: String,
//       required: function () {
//         return !this.email;
//       },
//       unique: true,
//       sparse: true,
//     },
//     Password: {
//       type: String,
//       required: true,
//     },
//     role: {
//       type: String,
//       default: "user",
//     },
//     isLogin: {
//       type: Boolean,
//       default: false,
//     },
//     lastLogin: {
//       type: Date,
//       default: null,
//     },
//     otp: {
//       type: String,
//     },
//     otpExpiry: {
//       type: Date,
//     },
//   },
//   { collection: "UserDetails" }
// );

// userSchema.pre("validate", function (next) {
//   if (!this.email && !this.phoneNumber) {
//     return next(new Error("Either email or phoneNumber is required"));
//   }
//   next();
// });

// const userDetails = mongoose.model("User", userSchema);

// export default userDetails;


import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    Name: {
      type: String,
      required: true,
      default: "User",
    },
    email: {
      type: String,
      required: function () {
        return !this.phoneNumber;
      },
      unique: true,
      sparse: true,
    },
    phoneNumber: {
      type: String,
      required: function () {
        return !this.email;
      },
      unique: true,
      sparse: true,
    },
    Password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
    },
    isLogin: {
      type: Boolean,
      default: false,
    },
    lastLogin: {
      type: Date,
      default: null,
    },
    otp: {
      type: String,
    },
    otpExpiry: {
      type: Date,
    },
    title: {
      type: String,
      default: "Farmer",
    },
    location: {
      type: String,
      default: "India",
    },
    joinDate: {
      type: String,
      default: () => new Date().toLocaleString("en-US", { month: "long", year: "numeric" }),
    },
    farmsManaged: {
      type: String,
      default: "1 farm",
    },
    experienceYears: {
      type: String,
      default: "1+ years",
    },
    crops: {
      type: [String],
      default: ["Wheat", "Rice"],
    },
    loginHistory: {
      type: [{ date: String, time: String }],
      default: [],
    },
    profileImage: {
      type: String,
      default: null,
    },
  },
  { collection: "UserDetails" }
);

userSchema.pre("validate", function (next) {
  if (!this.email && !this.phoneNumber) {
    return next(new Error("Either email or phoneNumber is required"));
  }
  next();
});

const userDetails = mongoose.model("User", userSchema);
export default userDetails;