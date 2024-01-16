const mongoose = require("mongoose");

const connectDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/teams")
    .then(() => console.log("database connected!"))
    .catch((err) => console.log("database connection failed", err));
};

module.exports = connectDB;
