const { Todo } = require("../models");

const createTodo = async (req, res) => {
  const { name, completed } = req.body;
  const userId = req.user.id;

  if (!name) {
    return res.status(400).json({ error: "'name' is required" });
  }

  try {
    const todo = await Todo.create({
      name,
      completed: completed !== undefined ? completed : false,
      userId,
    });
    console.log("Todo", todo);
    return res.status(201).json(todo);
  } catch (err) {
    console.error("Error creating Todo:", err);
    return res
      .status(500)
      .json({ error: "An error occurred while creating the Todo" });
  }
};

const getTodos = async (req, res) => {
  const userId = req.user.id;

  if (!userId) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  try {
    const todos = await Todo.findAll({ where: { userId } });
    return res.status(200).json(todos);
  } catch (err) {
    console.error("Error getting Todos:", err);
    return res.status(500).json({
      message: err.message || "An error occurred while getting the Todos",
    });
  }
};

module.exports = { createTodo, getTodos };
