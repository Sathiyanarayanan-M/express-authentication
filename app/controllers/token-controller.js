const jwt = require("jsonwebtoken");

require("dotenv").config();


// Token Generation


exports.generateToken = async (user) => {
    var token = jwt.sign(user, process.env.SECRET_KEY, {
        expiresIn: process.env.EXPIRES_IN
    });
    return token
}
exports.generateRefreshToken = async (user) => {
    var refreshToken = jwt.sign(user,process.env.REFRESH_SECRET_KEY);
    return refreshToken
}