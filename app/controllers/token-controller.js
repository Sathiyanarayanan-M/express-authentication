const jwt = require("jsonwebtoken");

require("dotenv").config();


// exports.verifyToken = async (token,req,res,next) => {
//     if (!token) return res.status(403).send({ auth: false, message: 'No token provided.' });
//     jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
//         if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.',err:err });
//         req.userId = decoded.id;
//         return res.send({auth:true,token:req.userId})
//     });
// }

exports.generateToken = async (id) => {
    var token = jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN
    });
    var refreshToken = jwt.sign({id},process.env.REFRESH_SECRET_KEY,{
        expiresIn:process.env.REFRESH_LIFE
    });
    return token
}