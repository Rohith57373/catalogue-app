const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const multer = require('multer');
const { storage } = require('../config/cloudinary');
const upload = multer({ storage });

// GET /api/categories
router.get('/', async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/categories (Admin)
router.post('/', upload.single('image'), async (req, res) => {
    try {
        const { name, description } = req.body;
        const image = req.file ? req.file.path : null;

        if (!image) {
            return res.status(400).json({ message: 'Image is required' });
        }

        const category = new Category({
            name,
            description,
            image,
        });

        const newCategory = await category.save();
        res.status(201).json(newCategory);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/categories/:id (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        if (!category) return res.status(404).json({ message: 'Category not found' });

        await category.deleteOne();
        res.json({ message: 'Category deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
