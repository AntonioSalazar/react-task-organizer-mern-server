//Routes used to auth users
const express = require('express');
const router = express.Router();
const { check } = require('express-validator');

//controller
const authController = require('../controllers/authController');


//auth a user
//----> api/auth  
router.post("/", 
    [
        check('email', 'Add a valid email').isEmail(),
        check('password', 'Password needs to have a minimum of 6 characters').isLength({min: 6})
    ],
    authController.authenticateUser
);

//login - gets authenticated user
router.get('/',
    auth,
    authController.authenticatedUser
)

module.exports = router;