const mongoose = require("mongoose");
const validator = require("validator");

let ProductSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name required"],
  },
  description: {
    type: String,
    required: [true, "Product description required"],
  },
});

module.exports = mongoose.model("Product", ProductSchema);
