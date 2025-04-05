const { MailtrapClient } = require("mailtrap");
const { Sequelize } = require("sequelize");
require("dotenv").config();
const Todo = require("../models");
const mailtrapClient = new MailtrapClient({
  token: "c9e45102ec21ea5ce263689a8cc0c1d8",
});

const sender = {
  email: "hello@demomailtrap.co",
  name: "Mailtrap Test",
};

const sendWelcomeEmail = async (email, todo) => {
  try {
    const response = await mailtrapClient.send({
      from: sender,
      to: [{ email }],
      subject: `Todo "${todo.name}" is overdue`,
      text: `Your todo "${todo.name}"`,
      html: "<h1>Welcome</h1>",
      category: "Welcome Email",
    });

    console.log("Welcome Email sent successfully!", response);
  } catch (error) {
    throw error.message;
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
