const express = require("express");
const router = express();

const AuthController = require("../controllers/authController");
router.post("/signup", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.get("/settings/account", AuthController.getUserAccount);
router.put("/settings/account", AuthController.updateUserAccount);
router.put("/settings/password", AuthController.updatePassword);
module.exports = { authrouter: router };
