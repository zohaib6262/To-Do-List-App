const express = require("express");
const cors = require("cors");
const cron = require("node-cron");
const { authrouter } = require("./routes/authrouter");
const { todorouter } = require("./routes/todorouter");
const { googleAuth } = require("./middleware/authMiddleware");
const AuthController = require("./controllers/authController");
const { Todo } = require("./models");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const { sendWelcomeEmail } = require("./lib/mailtrap.js");

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

// Authentication routes
app.post("/auth", googleAuth, AuthController.googleLogin);
app.get("/oauth", AuthController.googleLogin);
app.use("/auth", authrouter);
app.use("/todos", todorouter);

// Function to check overdue tasks
async function checkOverdueTodos() {
  try {
    const currentTime = new Date();

    const overdueTodos = await Todo.findAll({
      where: {
        dueDate: { [Sequelize.Op.lt]: currentTime },
        completed: false,
      },
    });

    if (overdueTodos.length) {
      console.log(`Found ${overdueTodos.length} overdue tasks`);

      for (const todo of overdueTodos) {
        await sendWelcomeEmail("zohaibbinashraaf@gmail.com", todo);
        console.log(`Sent email for overdue todo: "${todo.name}"`);
      }
    } else {
      console.log("No overdue tasks found.");
    }

    return overdueTodos;
  } catch (error) {
    console.error("Error checking overdue Todos:", error);
  }
}

// Schedule the cron job to run every minute
const job = cron.schedule("*/1 * * * *", checkOverdueTodos);
job.start();

// Start the server
app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
