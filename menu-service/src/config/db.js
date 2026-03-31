const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const mongoUri = (process.env.MONGO_URI || '').trim();

    if (!mongoUri) {
      throw new Error('MONGO_URI is missing in menu-service/.env');
    }

    await mongoose.connect(mongoUri);
    console.log('Connected to MongoDB (menu-db)');
  } catch (err) {
    console.error('MongoDB connection error:', err.message);
    process.exit(1);
  }
};

module.exports = connectDB;