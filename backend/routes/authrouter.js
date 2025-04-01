const express = require("express");
const router = express();

const AuthController = require("../controllers/authController");
router.post("/signup", AuthController.registerUser);
router.post("/login", AuthController.loginUser);

module.exports = { authrouter: router };
