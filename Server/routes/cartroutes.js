const express = require("express");
const router = express.Router();
const {protect} = require("../middleware/authMiddleware")
const {addToCart,getCartByUserId,removeFromCart,deleteCart} = require("../controllers/cartController");

router.post("/carts", protect, addToCart);
router.get("/carts", protect, getCartByUserId);
router.delete("/carts", protect, deleteCart);
router.delete("/carts/:carId", protect, removeFromCart);

module.exports = router;