const Order = require("../models/Order");
const Car = require("../models/Car");
const Cart = require("../models/CartDetails");

// 1. Create a New Order (Checkout)
exports.createOrder = async (req, res) => {
    try {
        const { carId, amountPaid, transactionId } = req.body;
        const buyerId = req.user.id;

        // Check if the car is still available
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).json({ message: "Car not found" });
        }
        if (car.isSold) {
            return res.status(400).json({ message: "This car has already been sold" });
        }

        // Create the Order
        const newOrder = new Order({
            buyer: buyerId,
            car: carId,
            amountPaid,
            transactionId,
            paymentStatus: 'Completed' // Assuming payment is processed before this call
        });

        const savedOrder = await newOrder.save();

        // Mark the car as sold so it no longer appears in general listings
        await Car.findByIdAndUpdate(carId, { isSold: true });

        // Optional: Remove this car from the user's cart after purchase
        await Cart.findOneAndUpdate(
            { user: buyerId },
            { $pull: { items: { car: carId } } }
        );

        res.status(201).json({
            message: "Purchase successful!",
            order: savedOrder
        });

    } catch (error) {
        res.status(500).json({ message: "Error processing order", error: error.message });
    }
};

// 2. View All Orders for the Logged-in User
exports.getUserOrders = async (req, res) => {
    try {
        const userId = req.user.id;

        // Fetch orders and populate car details for the UI
        const orders = await Order.find({ buyer: userId })
            .populate("car", "make model year images price")
            .sort({ createdAt: -1 });

        if (!orders || orders.length === 0) {
            return res.status(200).json({ message: "No purchase history found", orders: [] });
        }

        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error fetching orders", error: error.message });
    }
};