const mongoose = require("mongoose");

// const LocalURI = "mongodb://localhost:27017/mern_admin";
const URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(URI);
    console.log("Connection successfull to db.");
  } catch (error) {
    console.log("connection failed to db...");
    process.exit(0);
  }
};

module.exports = connectDB;
