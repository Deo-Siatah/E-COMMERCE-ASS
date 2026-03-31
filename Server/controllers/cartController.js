const Cart = require("../models/CartDetails");

// 1. Add to Cart / Create Cart
exports.addToCart = async (req, res) => {
    try {
        const { carId } = req.body;
        const userId = req.user.id;

        // Find user's cart or create a new one if it doesn't exist
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            cart = new Cart({
                user: userId,
                items: [{ car: carId }]
            });
        } else {
            // Check if car is already in the cart to avoid duplicates
            const isCarInCart = cart.items.some(item => item.car.toString() === carId);
            
            if (isCarInCart) {
                return res.status(400).json({ message: "Car is already in your cart/watchlist" });
            }

            cart.items.push({ car: carId });
        }

        await cart.save();
        res.status(200).json({ message: "Car added to cart successfully", cart });
    } catch (error) {
        res.status(500).json({ message: "Error adding to cart", error: error.message });
    }
};

// 2. Get Cart for a Specific User
exports.getCartByUserId = async (req, res) => {
    try {
        const userId = req.user.id;

        // We use .populate('items.car') to get full car details (make, model, price, images)
        const cart = await Cart.findOne({ user: userId }).populate("items.car");

        if (!cart) {
            return res.status(200).json({ items: [], message: "Cart is empty" });
        }

        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ message: "Error fetching cart", error: error.message });
    }
};

// 3. Remove Item from Cart (Update Cart)
exports.removeFromCart = async (req, res) => {
    try {
        const { carId } = req.params; // Expecting /api/cart/:carId
        const userId = req.user.id;

        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: "Cart not found" });
        }

        // Filter out the specific car
        cart.items = cart.items.filter(item => item.car.toString() !== carId);

        await cart.save();
        res.status(200).json({ message: "Item removed from cart", cart });
    } catch (error) {
        res.status(500).json({ message: "Error updating cart", error: error.message });
    }
};

// 4. Delete/Clear Entire Cart
exports.deleteCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const deletedCart = await Cart.findOneAndDelete({ user: userId });

        if (!deletedCart) {
            return res.status(404).json({ message: "No cart found to delete" });
        }

        res.status(200).json({ message: "Cart cleared successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting cart", error: error.message });
    }
};