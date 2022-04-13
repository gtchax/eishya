const User = require("../models/User");
const Order = require("../models/Order");
const asyncHandler = require("express-async-handler");

exports.me = asyncHandler(async (req, res, next) => {
  console.log("inside me controller req.user", req.user);
  let user = await User.findById(req.user._id);

  if (user) {
    return res.json({ success: true, data: user });
  }

  return res.status(500).json({
    success: false,
    error: "Failed to retrieve profile data",
  });
});

exports.myorders = asyncHandler(async (req, res, next) => {
  let orders = await Order.find({ orderedBy: req.user.id }).sort({
    createdAt: -1,
  });

  if (orders) {
    return res.json({ success: true, data: orders });
  }

  return res.status(500).json({
    success: false,
    error: "Failed to retrieve orders",
  });
});

exports.order = asyncHandler(async (req, res, next) => {
  console.log("req.body", req.body);
  console.log("req.user", req.user);
  let smallIce = req.body.items.filter((prod) => prod.id === 1);
  let totalSmall = smallIce.reduce((acc, curr) => {
    return acc + Number(curr.qty) * 7;
  }, 0);

  let largeIce = req.body.items.filter((prod) => prod.id !== 1);
  let totalLarge = largeIce.reduce((acc, curr) => {
    return acc + Number(curr.qty * 35);
  }, 0);

  let grandTotal = Number((totalLarge + totalSmall).toFixed(2));

  let orderSchema = {
    items: req.body.items,
    time: req.body.time,
    date: req.body.date,
    payment: req.body.payment,
    total: grandTotal,
    paid: "Outstanding",
    orderedBy: req.user.id,
  };

  if (req.body.address.length < 1) {
    orderSchema.address = req.user.profile.address.trim();
  } else if (req.user.profile.address.trim() !== req.body.address.trim()) {
    orderSchema.address = req.body.address.trim();
  } else {
    orderSchema.address = req.user.profile.address.trim();
  }

  console.log("orderSchema", orderSchema);

  let newOrder = await Order.create(orderSchema);

  if (newOrder) {
    return res.json({ success: true, data: "Order placed successfully" });
  } else {
    return res.status(500).json({
      success: false,
      error: "Failed to create order",
    });
  }
});

exports.updateprofile = asyncHandler(async (req, res, next) => {
  let updatedDetails = req.body;
  const updated = await User.findOneAndUpdate(
    { _id: req.user.id },
    updatedDetails,
    { new: true }
  );

  if (updated) {
    return res.status(201).json({ success: true, data: updated });
  }
  return res.status(500).json({
    success: false,
    error: "Failed to update profile",
  });
});
exports.changepassword = asyncHandler(async (req, res, next) => {
  // Find user and return the user data including the password field
  const user = await User.findOne({
    email: req.user.email,
  }).select("+password");

  if (!user) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid credentials" });
  }

  //Check password match
  const isMatch = await user.matchPassword(req.body.old);
  console.log("isMatch", isMatch);
  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid credentials" });
  }

  // Set new password
  user.password = req.body.new;
  let success = await user.save({ validateBeforeSave: false });
  console.log("success", success);
  if (success) {
    return res
      .status(201)
      .json({ success: true, error: "Password changed successfully" });
  }
});
