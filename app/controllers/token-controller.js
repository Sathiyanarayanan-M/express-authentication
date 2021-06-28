const jwt = require("jsonwebtoken");

require("dotenv").config();

//Refresh the Access token
const token = async (req, res, next) => {
    const postData = req.body;

    if (postData.refreshToken) {
        jwt.verify(postData.refreshToken,process.env.REFRESH_SECRET_KEY,async (err,payload) => {
            if(err){
                return next(err);
            }
            const token = await generateToken(payload.id);
            return res.send({success:true,token: token,refreshToken:postData.refreshToken});
        });
    }
    else {
        return next({ code: 403, message: "refreshToken Not Provided" });
    }
}


// Token Generation

//Generate Access token
const generateToken = async (id) => {
    var token = jwt.sign({id}, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN
    });
    return token
}

//Generate Refresh token
const generateRefreshToken = async (id) => {
    var refreshToken = jwt.sign({id}, process.env.REFRESH_SECRET_KEY);
    return refreshToken
}


module.exports.generateToken = generateToken;
module.exports.generateRefreshToken = generateRefreshToken;
module.exports.token = token;