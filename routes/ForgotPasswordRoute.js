const express = require("express");
const router = express.Router();
const ForgotPassword = require("../controller/ForgotPasswordController.js");

router.put("/forgotpassword", ForgotPassword);

module.exports = router;