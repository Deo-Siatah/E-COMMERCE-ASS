const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    buyer: { type: mongoose.Schema.Types.ObjectId, ref: 'UserProfile', required: true },
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    amountPaid: { type: Number, required: true },
    paymentStatus: { type: String, enum: ['Pending', 'Completed', 'Failed'], default: 'Pending' },
    transactionId: { type: String }
}, { timestamps: true })

module.exports = mongoose.model('Order', orderSchema);