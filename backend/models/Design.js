const mongoose = require('mongoose');

const designSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    category: {
        type: String, // Storing category ID or Name. Using ID is better but for simplicity with frontend mock data structure, we might use name or ID. Let's use ID if possible, but frontend sends string ID like 'bridal'. Let's stick to string ID for now to match frontend.
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    images: [{
        type: String,
        required: true,
    }],
    workType: {
        type: String,
        required: true,
    },
    featured: {
        type: Boolean,
        default: false,
    },
    cloudinaryFolder: {
        type: String,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Design', designSchema);
