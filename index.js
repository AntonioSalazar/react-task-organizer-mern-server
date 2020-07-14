const express = require('express');
const connectDB = require('./config/db');

//crate the server
const app = express();


//connect to the db
connectDB();

// Application port
const PORT = process.env.PORT || 4000;

//import routes
app.use('/api/users', require('./routes/users'));

//init app
app.listen(PORT, () => {
    console.log(`Server is up and running, port: ${PORT}`);
})