const express = require('express');
const connectDB = require('./config/db');

//crate the server
const app = express();


// Application port
const PORT = process.env.PORT || 4000;

//Main page
app.get('/', (req, res) => {
    res.send('hello world')
})

//init app
app.listen(PORT, () => {
    console.log(`Server is up and running, port: ${PORT}`);
})