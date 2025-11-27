const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        if (!req.savedCloudinaryFolder) {
            let folderPrefix = 'gayathri_silks/others';
            if (req.originalUrl && req.originalUrl.includes('/api/designs')) {
                folderPrefix = 'gayathri_silks/designs';
            } else if (req.originalUrl && req.originalUrl.includes('/api/inquiry')) {
                folderPrefix = 'gayathri_silks/inquiries';
            }

            let folderName = `${folderPrefix}/uncategorized`;

            if (req.body && req.body.title && folderPrefix.includes('designs')) {
                const sanitizedTitle = req.body.title.trim().replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
                folderName = `${folderPrefix}/${sanitizedTitle}_${Date.now()}`;
            } else {
                folderName = `${folderPrefix}/upload_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
            }
            req.savedCloudinaryFolder = folderName;
        }

        return {
            folder: req.savedCloudinaryFolder,
            allowed_formats: ['jpg', 'png', 'jpeg', 'webp'],
        };
    },
});

module.exports = {
    cloudinary,
    storage,
};
