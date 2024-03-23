const mongoose = require("mongoose");
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log("DB connection successful", `${conn.connection.host}`);
  } catch (error) {
    console.log(`server not connected: ${error.message}`);
  }
};
module.exports = connectDB;
