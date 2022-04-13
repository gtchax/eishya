const User = require("../models/User");
const asyncHandler = require("express-async-handler");

exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, error: "Please provide an email and password" });
  }

  // Find user
  const user = await User.findOne({
    email,
  }).select("+password");

  if (user === null) {
    return res.status(401).json({
      success: false,
      error: "Invalid credentials user does not exist",
    });
  }

  if (!user) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid credentials" });
  }

  //Check password match
  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return res
      .status(401)
      .json({ success: false, error: "Invalid credentials" });
  }
  const token = user.getSignedJwtToken();
  return res.status(200).json({ success: true, token });
  // sendTokenResponse(user, 200, res);
});

exports.signup = asyncHandler(async (req, res, next) => {
  const existingUser = await User.findOne({ email: req.body.email });
  console.log("existingUser", existingUser);
  if (existingUser) {
    return res.status(422).json({
      success: false,
      error: "User with provided email already exists!",
    });
  }

  // Create user

  let newUser = await User.create(req.body);

  if (newUser) {
    const token = newUser.getSignedJwtToken();
    return res.status(200).json({ success: true, token });
  }

  // User.create(req.body, (err, user) => {
  //   if (err) {
  //     console.log("error ==========", err);
  //     console.log("error._message ==========", err._message);
  //     return res.status(500).json({
  //       success: false,
  //       error: err,
  //     });
  //   }
  //   const token = user.getSignedJwtToken();
  //   return res.status(200).json({ success: true, token });
  // });
});
