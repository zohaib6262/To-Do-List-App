const { User } = require("../models");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
const nodemailer = require("nodemailer");
const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const username = fullName.toLowerCase();
  try {
    const userExists = await User.findOne({ where: { email } });
    console.log("User Exits", fullName, email, password, username);

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ username, email, password, fullName });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    console.log("ISPASSWORD", isPasswordValid);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.dataValues.id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

//For Forgost Password
// Setup email transporter
const transporter = nodemailer.createTransport({
  service: "gmail", // Use your email provider's service
  auth: {
    user: process.env.EMAIL_USER, // Replace with your email
    pass: process.env.EMAIL_PASS, // Replace with your email password or app password
  },
});
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate reset token with 1-hour expiration
    const resetToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Save token and expiration time to the database
    await user.update({
      resetToken,
      resetTokenExpiry: Date.now() + 3600000, // Expiry in 1 hour
    });

    // Send email with reset link
    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    console.log("Reset Url", resetUrl);
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>You requested a password reset.</p>
        <p>Click this <a href="${resetUrl}">link</a> to reset your password.</p>
        <p>This link will expire in 1 hour.</p>
      `,
    });

    res.json({
      message:
        "If your email is registered, you will receive a password reset link shortly.",
    });
  } catch (error) {
    console.error("Password reset error:", error);
    res.status(500).json({ message: "Error processing request" });
  }
};
const getUserAccount = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findOne({
      where: { id: decoded.id },
      attributes: ["id", "fullName", "email", "username"],
    });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("Usersadfdasf", user);
    res.status(200).json({ user });
  } catch (error) {
    console.error("Error verifying token:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

const updateUserAccount = async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1]; // Extract "Bearer <token>"

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    const { fullName, email, username } = req.body;

    const existingUserWithEmail = await User.findOne({ where: { email } });

    if (existingUserWithEmail && existingUserWithEmail.id !== userId) {
      return res.status(400).json({ message: "Email is already in use" });
    }

    const existingUserWithUsername = await User.findOne({
      where: { username },
    });

    if (existingUserWithUsername && existingUserWithUsername.id !== userId) {
      return res.status(400).json({ message: "Username is already in use" });
    }

    const updatedUser = await User.update(
      {
        fullName,
        email,
        username,
      },
      {
        where: { id: userId },
      }
    );

    if (updatedUser[0] === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    // Return a success response
    res.status(200).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating user account", error });
  }
};
const updatePassword = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;
    const { currentPassword, newPassword, confirmPassword } = req.body;

    if (!newPassword || !confirmPassword || !currentPassword) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: "New passwords do not match" });
    }

    const user = await User.findOne({ where: { id: userId } });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate the current password
    const isPasswordValid = await bcrypt.compare(
      currentPassword,
      user.dataValues.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    // Hash the new password before saving
    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await User.update(
      { password: hashedNewPassword },
      { where: { id: userId } }
    );

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating password", error });
  }
};

// Google Login
const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name } = userRes.data;
    let user = await User.findOne({ where: { email } });

    if (!user) {
      user = await User.create({
        email,
        fullName: name,
        username: name.toLowerCase().replace(/\s+/g, "_"),
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      fullName: user.fullName,
      username: user.username,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      error: "Failed to authenticate with Google",
      details: error.message,
    });
  }
};

const fetchUserData = async (access_token) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data from Google");
  }

  const userData = await response.json();
  return userData;
};

module.exports = {
  registerUser,
  loginUser,
  googleLogin,
  getUserAccount,
  updateUserAccount,
  updatePassword,
  forgotPassword,
};
