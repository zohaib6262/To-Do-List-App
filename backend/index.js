const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { authrouter } = require("./routes/authrouter");
const { todorouter } = require("./routes/todorouter");
require("dotenv").config();
const { checkOverdueTodos } = require("./lib/mailtrap.js"); // Import the function
const app = express();
const port = 3000;
app.use(express.json());
app.use(cors());

app.use("/auth", authrouter);
app.use("/todos", todorouter);

// Schedule the cron job to run every minute
// const job = cron.schedule("*/1 * * * *", checkOverdueTodos); // Use the imported function
// job.start();

// Start the server
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
