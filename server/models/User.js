const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

let userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your password"],
    },
    password: {
      type: String,
      select: false, // When the user document is queried it will not automatically return the password
      required: [true, "Please provide a password"],
      minlength: [8, "Password should be at least 8 characters"],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    role: {
      type: String,
      enum: ["admin", "manager", "client"],
      default: "client",
    },

    profile: {
      phone: {
        type: String,
        required: true,
        validate: [validator.isMobilePhone, "A valid phone number is required"],
        minlength: [10, "A valid phone number is required"],
      },
      whatsapp: {
        type: String,
      },
      address: {
        type: String,
      },
      vat: {
        type: String,
      },
      company: {
        type: String,
      },
    },
  },
  { timestamps: true }
);

/* Salts password before saving a new User. This can be treated as database middleware
 and is executed 'pre', before saving a new user document to the database. */

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Sign JWT
userSchema.methods.getSignedJwtToken = function () {
  return jwt.sign(
    { id: this._id, role: this.role, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRE,
    }
  );
};

// Match password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Generate and hash reset password token
userSchema.methods.getResetPasswordToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hash token and set to resetPasswordToken field
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  // Set to expire in 15mins
  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
