const jwt = require("jsonwebtoken");

module.exports = function (req, res, next){
    //read header token
    const token = req.header('x-auth-token');

    //check if there is no token
    if(!token){
        return res.status(401).json({msg : "There is no token, permission denied"})
    }

    //validate token

    try {
        const encrypted = jwt.verify(token, process.env.SECRET)
        req.user = encrypted.user;
        next();
    } catch (error) {
        res.status(401).json({msg: 'Token is not valid'})
    }
}