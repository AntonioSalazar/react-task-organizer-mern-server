const mongoose = require('mongoose');
require('dotenv').config({path: variables.env});

const connectDB = async () => {
    try{

    } catch(error){
        console.log(error);
        process.exit(1); ///Stop the app
    }
}

module.exports = connectDB;