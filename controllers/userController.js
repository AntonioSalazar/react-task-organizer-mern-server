const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {

    //check if there are any errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    //extract email and password
    const { email, password } = req.body;
    
    try {

        //validate user is unique
        let user = await User.findOne({email});

        if(user) {
            return res.status(400).json({msg: "User already exists"})
        }

        //create the new user into DB
        user = new User(req.body);

        //hash password
        const salt = await bcryptjs.genSalt(10);
        user.password = await bcryptjs.hash(password, salt)

        //save the new user
        await user.save()

        //create and sign JWT
        const payload = {
            user : {
                id: user.id
            }
        };

        //sign JWT
        jwt.sign(payload, process.env.SECRET, {
            expiresIn: 3600
        }, (error, token) => {
            if(error) throw error;
            
            //confirmation messaage
            res.json({token});
        })


    
    } catch (error) {
        console.log(error);
        res.status(400).send('There was an error, we were not able to save the new user information')
    }
}
