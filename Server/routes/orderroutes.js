const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")
const {createOrder,getUserOrders} = require("../controllers/orderController");

router.post("/orders", protect, createOrder);
router.get("/orders", protect, getUserOrders);

module.exports = router;