const express = require("express");
const router = express();
const { authenticate } = require("../middleware/authMiddleware");
const TodoController = require("../controllers/todoController");

router.post("/create-todo", authenticate, TodoController.createTodo);

module.exports = { todorouter: router };
