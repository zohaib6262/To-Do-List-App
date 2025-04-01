const express = require("express");
const router = express();
const TodoController = require("../controllers/todoController");

router.post("/create-todo", TodoController.createTodo);

module.exports = { todorouter: router };
