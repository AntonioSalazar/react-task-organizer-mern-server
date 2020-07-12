const mongoose = require('mongoose');
require('dotenv').config({path: variables.env});

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            
        })
    } catch(error){
        console.log(error);
        process.exit(1); ///Stop the app
    }
}

module.exports = connectDB;