import React, { useState } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import NoTodos from "./components/NoTodos";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

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
        {todos.length >= 1 ? (
          <TodoList
            todos={todos}
            toggleTodoCompletion={toggleTodoCompletion}
            deleteTodo={deleteTodo}
          />
        ) : (
          <NoTodos />
        )}
      </div>
    </div>
  );
};

export default App;
