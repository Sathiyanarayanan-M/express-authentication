const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

const User = require("../models/user-model");
const isEmpty = require("../validation/userValidation").isEmpty;


router.route('/login').get((req, res) => {
    res.send('Post your Login Credentials as Json');
});

router.route('/login').post( async (req, res) => {
    const validation = require("../validation/userValidation").loginValidation(req.body);
    if (!isEmpty(validation)) {
        try{
           const user = await User.findOne({email:req.body.email});
           if (!user){
               res.send("Looks like you don't have a account")
           }
           else{
            bcrypt.compare(req.body.password, user.password, function(err, isMatch) {
                if (err) {
                  throw err
                } else if (!isMatch) {
                  res.send("Invalid Credentials");
                } else {
                  res.send("Logged In");
                }
              })
           }
        }
        catch(err){
            res.send(err)
        }
    }
    else {
        res.json(validation);
    }
});


router.route("/register").get((req, res) => {
    res.send("Post your Register Credentials");
});

router.route("/register").post((req, res) => {
    const validation = require("../validation/userValidation").registerValidation(req.body);
    if (!isEmpty(validation)) {
        User.findOne({ email: req.body.email }).then(user => {
            if (user) {
                res.send("Email Already Exists");
            }
            else {
                const {name,email,password} = req.body;
                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err,hash) => {
                        if (err) throw err;
                        User.create({ name:name,email:email,password:hash },  (err) => {
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

});

module.exports = router;