const asyncHandler = require("express-async-handler");
// const ErrorResponse = require("../utils/errorResponse.js");
const jwt = require("jsonwebtoken");
const User = require("../models/User.js");
const dotenv = require("dotenv");
dotenv.config();

exports.authCheck = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res
      .status(401)
      .json({
        success: false,
        error: "Not authorized. Login again with valid credentials. ",
      });
    // return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res
      .status(401)
      .json({
        success: false,
        error: "Not authorized. Login with again valid credentials. ",
      });
  }
});

// exports.adminCheck = asyncHandler(async (req, res, next) => {
//     const {email} = req.user

//     const adminUser = await User.findOne({email})

//     if(adminUser.role !== 'admin') {
//         res.status(401).json({success: false, error: 'Admin resource. Access denied'});

//         // res.status(401).json({
//         //     err: 'Admin resource. Access denied'
//         // })
//     } else {
//         next()
//     }

// })
