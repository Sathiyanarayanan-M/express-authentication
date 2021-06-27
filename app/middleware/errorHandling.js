
module.exports = (err,req,res,next) => {
    return res.status(err.code).send({
        err: true,
        message: err.message || "Server Error"
    });
}