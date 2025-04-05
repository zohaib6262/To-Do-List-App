const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { authrouter } = require("./routes/authrouter");
const { todorouter } = require("./routes/todorouter");
const { googleAuth } = require("./middleware/authMiddleware");
const AuthController = require("./controllers/authController");
require("dotenv").config();
const { checkOverdueTodos, sendWelcomeEmail } = require("./lib/mailtrap.js"); // Import the function
const { Todo } = require("./models");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Authentication routes
app.post("/auth", googleAuth, AuthController.googleLogin);
app.get("/oauth", AuthController.googleLogin);
app.use("/auth", authrouter);
app.use("/todos", todorouter);

// Schedule the cron job to run every minute
const job = cron.schedule("*/1 * * * *", checkOverdueTodos); // Use the imported function
job.start();

// Start the server
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
