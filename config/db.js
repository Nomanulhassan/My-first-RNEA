const mongoose = require('mongoose')
const colors = require('colors')
const MONGO_URL = "mongodb+srv://nomanulhassan69:Mousecharger89@cluster0.fn23u.mongodb.net/react_1st"


const connectDB = async () => {
   try {
    await mongoose.connect(MONGO_URL);
    console.log(`Connected to DataBase ${mongoose.connection.host}` .bgCyan.white)
   } catch (error) {
    console.log(` error in connection BD ${error}` .bgRed.white)
   }
};

module.exports = connectDB;