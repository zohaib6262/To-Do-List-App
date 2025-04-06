const express = require("express");
const router = express();
router.use(express.json());

const AuthController = require("../controllers/authController");

//Google Auth routes
router.get("/google", AuthController.googleLogin);

//Regular auth routes
router.post("/signup", AuthController.registerUser);
router.post("/login", AuthController.loginUser);
router.post("/forgot-password", AuthController.forgotPassword);
router.post("/reset-password", AuthController.resetPassword);
router.get("/settings/account", AuthController.getUserAccount);
router.put("/settings/account", AuthController.updateUserAccount);
router.put("/settings/password", AuthController.updatePassword);
module.exports = { authrouter: router };
