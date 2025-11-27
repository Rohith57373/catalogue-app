const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    message: {
        type: String,
    },
    measurements: {
        type: String,
    },
    image: {
        type: String, // Reference image URL
    },
    designId: {
        type: String, // Can be a specific design ID or 'general'
    },
    status: {
        type: String,
        enum: ['New', 'Replied', 'Pending', 'Closed'],
        default: 'New',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Inquiry', inquirySchema);
