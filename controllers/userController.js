const User = require('../models/User')

exports.createUser = async (req, res) => {

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

        //save the new user
        await user.save()


        //confirmation messaage
        res.json({msg: "User has been created succesfully"})
    } catch (error) {
        console.log(error);;
        res.status(400).send('There was an error, we were not able to save the new user information')
    }
}
