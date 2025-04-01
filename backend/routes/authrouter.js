const express = require("express");
const router = express();

const AuthController = require("../controllers/authController");
router.post("/signup", AuthController.signup);
module.exports = { router };
