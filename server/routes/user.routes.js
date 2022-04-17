const express = require("express");
const { authCheck } = require("../middleware/authCheck");
const {
  me,
  order,
  myorders,
  changepassword,
  updateprofile,
} = require("../controllers/user.controller");


const router = express.Router();
router.use(authCheck);

router.get("/me", me);
router.post("/order", order);
router.post("/changepassword", changepassword);
router.post("/updateprofile", updateprofile);
router.get("/myorders", myorders);

module.exports = router;
