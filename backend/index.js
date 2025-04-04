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

app.post("/auth", googleAuth, AuthController.googleLogin);
app.get("/oauth", AuthController.googleLogin);
app.use("/auth", authrouter);
app.use("/todos", todorouter);

// Overdue tasks checker
async function checkOverdueTasks() {
  try {
    const currentTime = new Date();

    const overdueTasks = await Todo.findAll({
      where: {
        dueDate: { [Sequelize.Op.lt]: currentTime },
        completed: false,
      },
    });

    if (overdueTasks.length) {
      console.log(`Found ${overdueTasks.length} overdue tasks`);

      for (const todo of overdueTasks) {
        await sendWelcomeEmail("zohaibbinashraaf@gmail.com", todo);
        console.log(`Sent email for overdue todo: "${todo.name}"`);
      }
    } else {
      console.log("No overdue tasks found.");
    }

    return overdueTasks;
  } catch (error) {
    console.error("Error checking overdue tasks:", error);
  }
}

// Schedule the cron job to run every minute
const job = cron.schedule("*/1 * * * *", checkOverdueTasks);
job.start();

app.listen(port, () => {
  console.log(`Server Running on http://localhost:${port}`);
});
