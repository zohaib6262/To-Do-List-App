const { Todo } = require("../models");

const createTodo = async (req, res) => {
  const { name, completed, dueDate } = req.body;
  const userId = req.user.id;
  console.log("Due Date", dueDate);

  if (!name) {
    return res.status(400).json({ error: "'name' is required" });
  }

  try {
    const todo = await Todo.create({
      name,
      dueDate,
      completed: completed !== undefined ? completed : false,
      userId,
    });
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

const updateTodo = async (req, res) => {
  const userId = req.user.id;
  const { name, completed, dueDate } = req.body;
  const { id } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  try {
    const todo = await Todo.findOne({ where: { id, userId } });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not owned by user" });
    }

    const todoUpdate = await Todo.update(
      { name, completed, dueDate },
      { where: { id, userId } }
    );

    return res
      .status(200)
      .json({ message: "Todo updated successfully", todoUpdate });
  } catch (err) {
    console.error("Error updating Todo:", err);
    return res.status(500).json({
      message: err.message || "An error occurred while updating the Todo",
    });
  }
};
const deleteTodo = async (req, res) => {
  const userId = req.user.id;
  const { id } = req.params;

  if (!userId) {
    return res.status(400).json({ message: "User is not authenticated" });
  }

  try {
    const todo = await Todo.findOne({ where: { id, userId } });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not owned by user" });
    }

    // Delete the todo and check if it was successful
    const deletedCount = await Todo.destroy({ where: { id, userId } });
    console.log("Deleted Count,,     ", deletedCount);
    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "Todo not found or not owned by user" });
    }

    return res.status(200).json({ message: "Todo deleted successfully" });
  } catch (err) {
    return res.status(500).json({
      message: err.message || "An error occurred while deleting the Todo",
    });
  }
};

module.exports = { createTodo, getTodos, updateTodo, deleteTodo };
