const mongoose = require('mongoose');
require('dotenv').config({path: process.env});

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('db connected')
    } catch(error){
        console.log(error);
        process.exit(1); ///Stop the app
    }
}

module.exports = connectDB;