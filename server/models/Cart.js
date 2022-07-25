/* Mongoose cart schema used to enforce a structure in the cart collection that would otherwise
    accept any type of database since MongoDB does not enforce strict structure.
*/
const mongoose = require("mongoose");
let CartSchema = mongoose.Schema(
  {
    items: Array,
    totalAfterDiscount: {
      type: Number,
      default: 0,
    },
    coupon: String,
    cartTotal: Number,
    orderedBy: {
      type: ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", CartSchema);
