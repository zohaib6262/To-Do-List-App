const { User } = require("../models");
require("dotenv").config();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const fetch = require("node-fetch");
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

const googleLogin = async (req, res) => {
  if (req.method === "POST") {
    return res.json({ url: req.url });
  }

  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://127.0.0.1:3000/oauth"
  );

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    req.tokens = tokens;

    await oAuth2Client.setCredentials(res.tokens);
    console.log("Tokens acquired");

    const user = oAuth2Client.credentials;
    console.log("Credentials", user);

    const userData = await fetchUserData(tokens.access_token);

    res.json({ user: userData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to authenticate with Google", details: error });
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
};
