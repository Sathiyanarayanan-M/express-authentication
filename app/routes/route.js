const express = require("express");
const router = express.Router();

const controller = require("../controllers/auth");
const tokenController = require("../controllers/token-controller").token


router.route('/auth/login').get((req, res) => {
    res.send('Post your Login Credentials as Json');
});

router.route('/auth/login').post(controller.login);

router.route("/auth/register").get((req, res) => {
    res.send("Post your Register Credentials");
});

router.route("/auth/register").post(controller.register);

router.route("/token").post(tokenController);

// router.route("/profile").get(profile);

module.exports = router;