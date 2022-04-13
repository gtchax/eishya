const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);
const Schema = mongoose.Schema;

const orderSchema = new Schema(
  {
    items: Array,
    orderId: { type: Number, unique: true, index: true },
    address: String,
    totalAfterDiscount: {
      type: Number,
      default: 0,
    },
    coupon: String,
    date: String,
    payment: String,
    time: String,
    currency: { type: String, default: "ZAR" },
    paid: { type: String },
    total: Number,
    orderStatus: {
      type: String,
      default: "Processing",
      enum: ["Processing", "Cancelled", "Confirmed", "Delivered"],
    },

    orderedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

// orderSchema.virtual("profile", {
//   ref: "User",
//   foreignField: "profile",
//   localField: "orderedBy",
// });

// orderSchema.virtual("profile", {
//   ref: "User",
//   localField: "orderedBy",
//   foreignField: "profile",
// });

orderSchema.plugin(AutoIncrement, { inc_field: "orderId", start_seq: 1000 });

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
