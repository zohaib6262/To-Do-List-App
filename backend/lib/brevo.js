require("dotenv").config();
const { Sequelize } = require("sequelize");
const { Todo } = require("../models");
const axios = require("axios");
const sendWelcomeEmail = async (email, todo) => {
  const apiKey = process.env.BREVO_KEY;
  const url = "https://api.brevo.com/v3/smtp/email";

  const emailData = {
    sender: {
      name: `${todo.name}`,
      email: "zohaibbinashraaf@gmail.com",
    },
    to: [
      {
        email: "zohaibbinashraaf@gmail.com",
      },
    ],
    subject: "Overdue todo",
    htmlContent: `<html><body><h1>Please! Completed your todo.</h1></body></html>`,
  };
  try {
    const response = await axios.post(url, emailData, {
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
    });
    console.log("Email sent for:", todo.name);
  } catch (error) {
    console.log("Error sending email", error);
  }
};

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

module.exports = { checkOverdueTodos };
