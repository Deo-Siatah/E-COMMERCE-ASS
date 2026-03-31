const Car = require("../models/Car");
const User = require("../models/UserProfile")
// 1. Create a New Car Listing
exports.createCar = async (req, res) => {
    try {
        const { make, model, year, price, description, images, condition, fuelType, mileage, transmission } = req.body;
        
        const newCar = new Car({
            make,
            model,
            year,
            price,
            description,
            images, // Array of URLs
            condition,
            fuelType,
            mileage,
            transmission,
            seller: req.user.id // From JWT middleware
        });

        const savedCar = await newCar.save();
        res.status(201).json(savedCar);
    } catch (error) {
        res.status(500).json({ message: "Error creating car listing", error: error.message });
    }
};

// 2. Get Cars (With Pagination, Search Filters, and Homepage logic)
exports.getCars = async (req, res) => {
    try {
        const { make, model, year, condition, page = 1, limit = 10, latest } = req.query;

        // Logic for Homepage (Top 3 Latest)
        if (latest === "true") {
            const latestCars = await Car.find().sort({ createdAt: -1 }).limit(3);
            return res.status(200).json(latestCars);
        }

        // Filter Logic for Dedicated Inventory Page
        let query = {};
        if (make) query.make = { $regex: make, $options: "i" }; // Case-insensitive
        if (model) query.model = { $regex: model, $options: "i" };
        if (year) query.year = year;
        if (condition) query.condition = condition;

        // Pagination Execution
        const skip = (page - 1) * limit;
        const cars = await Car.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(parseInt(limit));

        const total = await Car.countDocuments(query);

        res.status(200).json({
            cars,
            totalPages: Math.ceil(total / limit),
            currentPage: parseInt(page),
            totalCars: total
        });
    } catch (error) {
        res.status(500).json({ message: "Error fetching cars", error: error.message });
    }
};

// 5. Get Single Car by ID (with Owner Details)
exports.getCarById = async (req, res) => {
    try {
        const { id } = req.params;
        
        // We use .populate to fetch the seller's username, email, and phone automatically!
        const car = await Car.findById(id).populate("seller", "username email");

        if (!car) {
            return res.status(404).json({ message: "Vehicle not found" });
        }

        res.status(200).json(car);
    } catch (error) {
        // Handle invalid MongoDB ObjectId formatting gracefully
        if (error.kind === "ObjectId") {
            return res.status(400).json({ message: "Invalid Vehicle ID format" });
        }
        res.status(500).json({ message: "Error fetching vehicle details", error: error.message });
    }
};

// 3. Update Car Listing
exports.updateCar = async (req, res) => {
    try {
        const { id } = req.params;
        // Ensure only the seller can update their own car
        const car = await Car.findById(id);
        
        if (!car) return res.status(404).json({ message: "Car not found" });
        if (car.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to update this listing" });
        }

        const updatedCar = await Car.findByIdAndUpdate(id, { $set: req.body }, { new: true });
        res.status(200).json(updatedCar);
    } catch (error) {
        res.status(500).json({ message: "Error updating car", error: error.message });
    }
};

// 4. Delete Car Listing
exports.deleteCar = async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car) return res.status(404).json({ message: "Car not found" });
        if (car.seller.toString() !== req.user.id) {
            return res.status(403).json({ message: "Unauthorized to delete this listing" });
        }

        await Car.findByIdAndDelete(id);
        res.status(200).json({ message: "Listing deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting car", error: error.message });
    }
};