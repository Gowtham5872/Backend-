const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const LoginController = require("../controller/LoginController.js");
router.post("/login", LoginController);


module.exports = router;