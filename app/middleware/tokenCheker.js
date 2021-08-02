const jwt = require("jsonwebtoken");

require("dotenv").config();

module.exports = function (req, res, next) {
    let token;
    try {
        token = req.headers.authorization.split(' ')[1];
    }
    catch (err) {
        err.message = "Token Error"
        return next(err);
    }
    if (token) {
        jwt.verify(token, process.env.SECRET_KEY, function (err, decoded) {
            if (err) {
                return next(err);
            }
            req.decoded = { id: decoded.id};
            next();
            // return res.json({decoded:req.decoded,success: true});
        });
    }
    else {
        return res.status(403).send({success: false, err: true, message: "No token Provided" });
    }
}
