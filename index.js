const express = require('express');
const connectDB = require('./config/db');

//crate the server
const app = express();


//connect to the db
connectDB();

//Express.json
app.use(express.json({extended: true}));

// Application port
const PORT = process.env.PORT || 4000;

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));


//init app
app.listen(PORT, () => {
    console.log(`Server is up and running, port: ${PORT}`);
})