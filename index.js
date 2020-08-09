const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

//crate the server
const app = express();

//CORS
app.use(cors());

//connect to the db
connectDB();

//Express.json
app.use(express.json({extended: true}));

// Application port
const port = process.env.PORT || 4000;

//import routes
app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));


//init app
app.listen(port, '0.0.0.0',() => {
    console.log(`Server is up and running, port: ${port}`);
})