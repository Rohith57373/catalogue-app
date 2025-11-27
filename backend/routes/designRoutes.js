const express = require('express');
const router = express.Router();
const Design = require('../models/Design');
const multer = require('multer');
const { storage, cloudinary } = require('../config/cloudinary');
const upload = multer({ storage });

// GET /api/designs
router.get('/', async (req, res) => {
    try {
        const { category, featured } = req.query;
        let query = {};

        if (category) query.category = category;
        if (featured === 'true') query.featured = true;

        const designs = await Design.find(query).sort({ createdAt: -1 });
        res.json(designs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// GET /api/designs/:id
router.get('/:id', async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        if (!design) return res.status(404).json({ message: 'Design not found' });
        res.json(design);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// POST /api/designs (Admin)
router.post('/', upload.array('images', 5), async (req, res) => {
    try {
        const { title, category, price, description, workType, featured } = req.body;
        const images = req.files ? req.files.map(file => file.path) : [];

        if (images.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        const design = new Design({
            title,
            category,
            price,
            description,
            workType,
            featured: featured === 'true',
            images,
            cloudinaryFolder: req.savedCloudinaryFolder, // Save the folder path
        });

        const newDesign = await design.save();
        res.status(201).json(newDesign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// PUT /api/designs/:id (Admin)
router.put('/:id', async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        if (!design) return res.status(404).json({ message: 'Design not found' });

        Object.assign(design, req.body);
        const updatedDesign = await design.save();
        res.json(updatedDesign);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// DELETE /api/designs/:id (Admin)
router.delete('/:id', async (req, res) => {
    try {
        const design = await Design.findById(req.params.id);
        if (!design) return res.status(404).json({ message: 'Design not found' });

        // Delete images from Cloudinary
        if (design.cloudinaryFolder) {
            try {
                // Delete all resources in the folder
                await cloudinary.api.delete_resources_by_prefix(design.cloudinaryFolder);
                // Delete the folder itself
                await cloudinary.api.delete_folder(design.cloudinaryFolder);
            } catch (cloudinaryError) {
                console.error('Error deleting from Cloudinary:', cloudinaryError);
                // Continue to delete from DB even if Cloudinary fails
            }
        } else if (design.images && design.images.length > 0) {
            // Fallback for legacy designs
            try {
                const publicIds = design.images.map(url => {
                    const regex = /\/upload\/(?:v\d+\/)?(.+)\.[a-z]+$/;
                    const match = url.match(regex);
                    return match ? match[1] : null;
                }).filter(id => id);

                if (publicIds.length > 0) {
                    await cloudinary.api.delete_resources(publicIds);
                }
            } catch (cloudinaryError) {
                console.error('Error deleting legacy images from Cloudinary:', cloudinaryError);
            }
        }

        await design.deleteOne();
        res.json({ message: 'Design deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
