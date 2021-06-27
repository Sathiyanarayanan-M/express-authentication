const bcrypt = require("bcryptjs");

const User = require("../models/user-model");
const isEmpty = require("../validation/userValidation").isEmpty;

const {verifyToken,generateToken} = require("./token-controller");


exports.login = async (req, res) => {
    const validation = require("../validation/userValidation").loginValidation(req.body);
    if (!isEmpty(validation)) {
        try {
            const user = await User.findOne({ email: req.body.email });
            if (!user) {
                return res.send("Looks like you don't have a account");
            }
            else {
                bcrypt.compare(req.body.password, user.password, async (err, isMatch) => {
                    if (err) {
                        throw err
                    } else if (!isMatch) {
                       return res.send("Invalid Credentials");
                    } else {
                        var token =await generateToken(user._id);
                        if (token){
                            return res.send({auth:true,message:"Logged In",token:token});
                        }
                        else{
                            return res.send({auth:false,message:"Failed to generate token"});
                        }
                    }
                });
            }
        }
        catch (err) {
            res.send(err)
        }
    }
    else {
        res.json(validation);
    }
}


exports.register = async (req, res) => {
    const validation = require("../validation/userValidation").registerValidation(req.body);
    if (!isEmpty(validation)) {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                res.send("Email Already Exists");
            }
            else {
                const { name, email, password } = req.body;
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        if (err) throw err;
                        User.create({ name: name, email: email, password: hash }, (err) => {
                            (err) ? res.send(err) : res.send("Registered Successfully");
                        });
                    });
                });
            }
        });
    }
    else {
        res.json(validation)
    }
}


// exports.profile = (req,res,next) => {
//     var token = req.headers['x-access-token']
//     if(!token) return res.send("token not found");
//     verifyToken(token,req,res,next);
// };