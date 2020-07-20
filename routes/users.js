//Routes used to create users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

//Controller
const userController = require('../controllers/userController');

//Create a user
//----> api/users  
router.post("/", 
    [
        check('name', 'Username is mandatory').not().isEmpty(),
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password needs to have a minimum of 6 characters').isLength({min: 6})
    ],
    userController.createUser
);

module.exports = router;