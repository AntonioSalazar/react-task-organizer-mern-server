//Routes used to create users
const express = require('express');
const router = express.Router();

//Controller
const userController = require('../controllers/userController');

//Create a user
//----> api/users  
router.post("/", 
    userController.createUser
);

module.exports = router;