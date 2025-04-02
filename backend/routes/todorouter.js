const express = require("express");
const router = express();
const { authenticate } = require("../middleware/authMiddleware");
const TodoController = require("../controllers/todoController");

router.post("/create-todo", authenticate, TodoController.createTodo);
router.get("/get-todos", authenticate, TodoController.getTodos);
router.put("/update-todo/:id", authenticate, TodoController.updateTodo);
router.delete("/delete-todo/:id", authenticate, TodoController.deleteTodo);

module.exports = { todorouter: router };
