import React, { useState, useEffect } from "react";

function TodoForm({ addTodo }) {
  const [todoName, setTodoName] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoName) return;

    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos", {
          // Corrected URL
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: todoName, completed: false }),
        });
        const data = await response.json();
        console.log("Data", data);
        addTodo(data); // Update the state in App.js
      } catch (error) {
        console.log("Error", error);
      }
    };
    fetchTodos();

    setTodoName("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoName}
        className="input"
        onChange={(e) => setTodoName(e.target.value)}
        placeholder={"Enter new todo"}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
}

export default TodoForm;
