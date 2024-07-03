// mongoDB connection config

const mongoose = require("mongoose");


const connectDB = async() => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("MongoDB is connected");
    } catch (error) {
        console.error(error);     
    }
};

module.exports = connectDB;