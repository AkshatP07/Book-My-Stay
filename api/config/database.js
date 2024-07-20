const mongoose = require("mongoose");
require("dotenv").config();

const dbConnect = () => {
    mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("Database connected successfully"))
    .catch((error) => {
        console.error("Database connection error:", error.message); 
        process.exit(1); 
    });
};

module.exports = dbConnect;