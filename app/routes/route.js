const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");
const tokenController = require("../controllers/token-controller").token
const privateScreen = require("./privateScreen");
const token_middleware = require("../middleware/tokenCheker");



//Login
router.route('/auth/login').get((req, res) => {
    res.send('Post your Login Credentials as Json');
});

router.route('/auth/login').post(controller.login);

//Register
router.route("/auth/register").get((req, res) => {
    res.send("Post your Register Credentials");
});

router.route("/auth/register").post(controller.register);


router.route("/dashboard").get(token_middleware,privateScreen);


//Generate access token by refresh token
router.route("/token").post(tokenController);

module.exports = router;