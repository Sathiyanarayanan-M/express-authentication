const jwt = require("jsonwebtoken");
const Errorhandler = require("../middleware/errorHandling")

require("dotenv").config();


module.exports = function(req,res,next) {
    const token = req.body.token || req.query.token || req.headers["x-access-token"]

    if(token){
        jwt.verify(token,process.env.SECRET_KEY, function(err,decoded){
            if(err){
               return next(err);
            }
            req.decoded = decoded.id;
            next();
        });
    }
    else{
        return res.status(403).send({err:true,message:"No token Provided"});
    }
}
