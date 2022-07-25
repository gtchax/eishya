const Order = require("../models/Order");
const asyncHandler = require("express-async-handler"); // Wraps a try catch, useful to avoid having to write try and catch statements for every controller function

exports.orders = asyncHandler(async (req, res, next) => {

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

  const { orderId, orderStatus } = req.body;
  const updated = await Order.findOneAndUpdate(
    { orderId },
    { orderStatus },
    { new: true }
  );
  if (updated) {
    return res.json({ success: true, data: updated });
  }

  return res.status(500).json({
    success: false,
    error: "Failed to update order status",
  });
});
