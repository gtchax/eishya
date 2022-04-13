const express = require("express");
const { orders, status } = require("../controllers/admin.controller");
const router = express.Router();

router.get("/admin/orders", orders);
router.post("/admin/status", status);

module.exports = router;
