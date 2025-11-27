const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category');
const Design = require('./models/Design');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const seedData = async () => {
    try {
        await Category.deleteMany();
        await Design.deleteMany();

        const categories = await Category.insertMany([
            {
                name: 'Bridal',
                description: 'Exclusive bridal collection',
                image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
            },
            {
                name: 'Maggam',
                description: 'Traditional maggam work designs',
                image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
            },
            {
                name: 'Stone Work',
                description: 'Elegant stone work blouses',
                image: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg'
            }
        ]);

        console.log('Categories seeded');

        await Design.insertMany([
            {
                title: 'Royal Peacock Bridal Blouse',
                category: 'Bridal',
                price: 12500,
                description: 'Intricate peacock design with zardosi work',
                workType: 'Zardosi',
                featured: true,
                images: ['https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg']
            },
            {
                title: 'Green Maggam Work',
                category: 'Maggam',
                price: 8500,
                description: 'Heavy maggam work on green silk',
                workType: 'Maggam',
                featured: true,
                images: ['https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg']
            },
            {
                title: 'Pink Stone Work',
                category: 'Stone Work',
                price: 5500,
                description: 'Simple yet elegant stone work',
                workType: 'Stone',
                featured: true,
                images: ['https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg']
            }
        ]);

        console.log('Designs seeded');
        process.exit();
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
