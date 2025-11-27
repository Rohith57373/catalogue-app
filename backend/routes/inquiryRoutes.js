const express = require('express');
const router = express.Router();
const Inquiry = require('../models/Inquiry');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

// POST /api/inquiry
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, phone, message, measurements, designId } = req.body;
        const image = req.file ? req.file.path : null;

        const inquiry = new Inquiry({
            name,
            phone,
            message,
            measurements,
            designId,
            image,
        });

        const newInquiry = await inquiry.save();
        res.status(201).json(newInquiry);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// GET /api/inquiry (Admin)
router.get('/', async (req, res) => {
    try {
        const inquiries = await Inquiry.find().sort({ createdAt: -1 });
        res.json(inquiries);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
