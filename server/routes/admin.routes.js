// Admin routes

const express = require("express");
const { orders, status } = require("../controllers/admin.controller"); // Controllers contain the business logic
const router = express.Router();

router.get("/admin/orders", orders);
router.post("/admin/status", status);

module.exports = router;
