const mongoose = require('mongoose');

const billSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    amount: {
        type: Number,
        required: true,
    },
    image: {
        public_id: String,
        url: String
    },
    description: {
        type: String,
        required: true,
    },
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // assumes you have a User model
        required: true,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    paidAt: {
        type: Date,
    },
    paidBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // you can separate admin/user roles in User schema
    }
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
