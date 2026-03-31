const mongoose = require('mongoose');

const carSchema = new mongoose.Schema({
    make: { type: String, required: true }, // e.g., Toyota
    model: { type: String, required: true }, // e.g., Camry
    year: { type: Number, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // Array of image URLs
    condition: { type: String, enum: ['New', 'Used'], default: 'Used' },
    fuelType: { type: String, enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
    mileage: { type: Number },
    transmission: { type: String, enum: ['Manual', 'Automatic'] },
    seller: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    isSold: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Car', carSchema);