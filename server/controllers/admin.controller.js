const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

exports.orders = asyncHandler(async (req, res, next) => {
  // let orders = await Order.find().populate("orderedBy");

  let orders = await Order.find()
    .populate("orderedBy")
    .sort({
      createdAt: -1,
    })
    .exec();

  if (orders) {
    return res.json({ success: true, data: orders });
  }

  return res.status(500).json({
    success: false,
    error: "Failed to retrieve orders",
  });
});

exports.status = asyncHandler(async (req, res, next) => {
  console.log("req.body", req.body);
  const { orderId, orderStatus } = req.body;
  console.log("update status", orderStatus);
  console.log("orderId", orderId);
  const updated = await Order.findOneAndUpdate(
    { orderId },
    { orderStatus },
    { new: true }
  );
  console.log("updated status", updated);
  if (updated) {
    return res.json({ success: true, data: updated });
  }

  return res.status(500).json({
    success: false,
    error: "Failed to update order status",
  });
});
