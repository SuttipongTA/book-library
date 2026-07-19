// ref: 37aa88161f 
const express = require("express");
const router = express.Router();
const authController = require("../controller/auth-controller");

router.post("/", authController.login);

module.exports = router;