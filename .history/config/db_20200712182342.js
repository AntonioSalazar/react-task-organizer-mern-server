const mongoose = require('mongoose');
require('dotenv').config({path: variables.env});

const connectDB = async () => {
    try{

    } catch(error){
        console.log(error);
        process.exit
    }
}

module.exports = connectDB;