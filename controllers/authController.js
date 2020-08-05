const User = require('../models/User');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

exports.authenticateUser = async (req, res) => {
    
    //check if there are any errors
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({ errors: errors.array() })
    }

    //extract email and password from the request

    const {email, password} = req.body;

    try{
        //check if the user is already  registered
        let user = await User.findOne({email});
        if(!user) {
            return res.status(400).json({msg: 'The user doesnt exists'})
        }

        //check the password
        const correctPass = await bcryptjs.compare(password, user.password)
        if(!correctPass){
            return res.status(400).json({msg: 'Incorrect Password'})
        }

        //if everything is correct
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
            
            //confirmation message
            res.json({token});
        })


    } catch (error){
        console.log(error);
    }
}


//gets user authenticated

exports.authenticatedUser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password')
        res.json({user})
    } catch (error) {
        console.log(error);
        res.status(500).json({msg: 'there was an error'})
    }
}