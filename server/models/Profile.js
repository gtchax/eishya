const mongoose = require("mongoose");
const validator = require("validator");

let ProfileSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide your password"],
    },
    password: {
      type: String,
      unique: true,
      required: [true, "Please provide a password"],
      minlength: 8,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    vat: {
      type: String,
    },
    phone: {
      type: String,
      required: true,
    },
    whatsapp: {
      type: String,
    },
    address: {
      type: String,
    },
  },
  { timestamps: true } // automatically adds createdAt and updatedAt timestamps
);

module.exports = mongoose.model("Profile", ProfileSchema);
