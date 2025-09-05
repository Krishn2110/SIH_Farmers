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
//         return !this.phoneNumber; // email required only if no phone
//       },
//       unique: false,
      
//     },
//     phoneNumber: {
//       type: String,
//       required: function () {
//         return !this.email; // phone required only if no email
//       },
//       unique: false,
     
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

// // ✅ Ensure at least one (email or phone) exists
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
