import React, { useState } from "react";

function TodoForm({ fetchTodos }) {
  const [todoName, setTodoName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!todoName) return;

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/todos/create-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({ name: todoName, completed: false }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to create todo.");
      } else {
        setTodoName("");
        fetchTodos();
      }
    } catch (error) {
      setError("An error occurred while creating the todo.");
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoName}
        className="input"
        onChange={(e) => setTodoName(e.target.value)}
        placeholder={"Enter new todo"}
        disabled={loading}
      />
      <button type="submit" disabled={loading}>
        {loading ? "Adding..." : "Add Todo"}
      </button>
      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default TodoForm;
