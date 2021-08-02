
module.exports = async (err, req, res, next) => {
    return res.status(err.code || 400).json({
        success: false,
        message: err.message || "Internal Server Error"
    });
}