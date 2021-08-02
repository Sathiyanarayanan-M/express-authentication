const express = require("express");
const router = express.Router();


module.exports = (req, res) => {
    res.json({decoded:req.decoded,success: true,message:"hey you are accessing the secure part"});
}
