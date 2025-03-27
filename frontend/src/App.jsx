import React, { useState } from "react";
import "./App.css";

import TodoFilter from "./components/TodoFilter";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [todoToEdit, setTodoToEdit] = useState(null);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const updateTodo = (updatedTodo) => {
    setTodos(
      todos.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );
    setTodoToEdit(null);
  };

  const toggleTodoCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="mainApp">
      <div className="card">
        <h1 className="appTitle">To-Do List App</h1>
        <TodoForm
          addTodo={addTodo}
          updateTodo={updateTodo}
          todoToEdit={todoToEdit}
        />
        <TodoFilter setFilter={setFilter} filterName={filter} />
        <TodoList
          todos={filteredTodos}
          toggleTodoCompletion={toggleTodoCompletion}
          deleteTodo={deleteTodo}
          setTodoToEdit={setTodoToEdit}
        />
      </div>
    </div>
  );
}

export default App;
