const mongoose = require("mongoose");
require('dotenv').config({ path: '.env.local' });

const mongoURI = process.env.MONGO_URI;

const connectToMongo = () => {
  mongoose
    .connect(mongoURI)
    .then(() => console.log("Connected to MongoDB Atlas..."))
    .catch((err) => console.error("Error occurred while connecting to MongoDB Atlas...", err));
};

module.exports = connectToMongo;
