// config/database.js
const mongoose = require('mongoose');
require('dotenv').config();

const DB_URL = process.env.DATABASE_URL;

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('✅ Database connected successfully!');
  } catch (error) {
    console.error('❌ Database connection error:', error);
  }
};

module.exports = connectDB;
