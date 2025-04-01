const { Todo } = require("../models");
const createTodo = async (req, res) => {
  const { name, completed } = req.body;

  if (!name) {
    return res.status(400).json({ error: "'name' is required" });
  }

  try {
    const todo = await Todo.create({
      name,
      completed: completed !== undefined ? completed : false,
    });
    console.log("Todo", todo);
    res.status(201).json(todo);
  } catch (err) {
    console.error("Error creating Todo:", err);
    res
      .status(500)
      .json({ error: "An error occurred while creating the Todo" });
  }
};

module.exports = { createTodo };
