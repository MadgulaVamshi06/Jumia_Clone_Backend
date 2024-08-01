const mongoose = require("mongoose");
const dotenv = require("dotenv");
const colors = require("colors");

dotenv.config();

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      serverSelectionTimeoutMS: 30000, // 30 seconds
      socketTimeoutMS: 45000, // 45 seconds
    });

    console.log(`Connected to MongoDB Database: ${conn.connection.host}`.bgMagenta.white);
  } catch (error) {
    console.log(`Error in MongoDB: ${error.message}`.bgRed.white);
    process.exit(1); // Exit process with failure
  }
};

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to DB Cluster'.green);
});

mongoose.connection.on('error', (error) => {
  console.error(`Mongoose connection error: ${error.message}`.red);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected'.yellow);
});

module.exports = connectDB;
