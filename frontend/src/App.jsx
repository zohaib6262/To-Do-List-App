import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import NoTodos from "./components/NoTodos";
import TodoFilter from "./components/TodoFilter";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filterName, setFilterName] = useState("all");

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const filteredTodos = todos.filter((todo) => {
    if (filterName === "completed") {
      return todo.completed;
    }
    if (filterName === "pending") {
      return !todo.completed;
    }
    return true;
  });
  const toggleTodoCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : true
      )
    );
  };
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };
  return (
    <div className="mainApp">
      <div className="card">
        <h1 className="appTitle">To-Do List App</h1>
        <TodoForm addTodo={addTodo} />
        <TodoFilter setFilterName={setFilterName} filterName={filterName} />
        <TodoList
          todos={filteredTodos}
          toggleTodoCompletion={toggleTodoCompletion}
          deleteTodo={deleteTodo}
        />
      </div>
    </div>
  );
};

export default App;
