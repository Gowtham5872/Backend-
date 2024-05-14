// db/config.js
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const mongoDb = async () => {
  try {
    await mongoose.connect(process.env.URL);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

module.exports = mongoDb;
