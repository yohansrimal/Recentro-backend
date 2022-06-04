const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://admin:admin123@recentrocluster.omuv3.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log("Successfully connected to the database");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
