const bcrypt = require("bcryptjs");

const User = require("../models/user-model");
const isEmpty = require("../validation/userValidation").isEmpty;

const errorHandler = require("../middleware/errorHandling");

const {generateToken,generateRefreshToken} = require("./token-controller");

const tokenList = {};


exports.login = async (req, res,next) => {
    const validation = require("../validation/userValidation").loginValidation(req.body);
    if (isEmpty(validation)) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return next({code:404,message:"user not found"});
            }
            else {
                bcrypt.compare(req.body.password, user.password, async (err, isMatch) => {
                    if (err) {
                      return next(err);
                    } else if (!isMatch) {
                          return next({code:401,message:"Invalid Credentials"});
                    } else {
                        const tokenId = {
                            email:user.email,
                            id:user._id
                        }
                        var token = await generateToken(tokenId);
                        var refreshToken = await generateRefreshToken(tokenId);
                        if (token && refreshToken){
                            tokenList.refreshToken = refreshToken
                            return res.send({auth:true,message:"Logged In",token:token,refreshToken:refreshToken,userId:user._id});
                        }
                        else{
                          return next({code:500, message:"Failed to generate token"});
                        }
                    }
                });
            }
        }
        catch (err) {
           return next(err);
        }
    }
    else {
       return next(validation);
    }
}


exports.register = async (req, res) => {
    const validation = require("../validation/userValidation").registerValidation(req.body);
    if (isEmpty(validation)) {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
               return next({code:401,message:"Email already Exist"});
            }
            else {
                const { name, email, password } = req.body;
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) {
                           return next(err);
                        }
                        User.create({ name: name, email: email, password: hash }, (err) => {
                            if(err){
                                return next(err);
                            }
                            else{
                                return res.send("Successfully Registered");
                            }
                        });
                    });
                });
            }
        });
    }
    else {
      return next(validation);
    }
}



exports.token = async (req,res,next) => {
    const postData = req.body;
    if (postData.refreshToken && postData.refreshToken in tokenList){
        const tokenId = {
            email:postData.email,
            id:user._id
        }
        const token = await generateToken(tokenId);
        return res.send({token:token})
    }
    else{
       return next({code:403,message:"refreshToken Not Provided"});
    }
}


// exports.profile = (req,res,next) => {
//     var token = req.headers['x-access-token']
//     if(!token) return res.send("token not found");
//     verifyToken(token,req,res,next);
// };