import React, { useState } from "react";
import moment from "moment"; // Import moment

function TodoForm({ fetchTodos }) {
  const [todoName, setTodoName] = useState("");
  const [dueDate, setDueDate] = useState(""); // State for dueDate
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation for empty todo name or empty due date
    if (!todoName) {
      setError("Todo name is required.");
      return;
    }

    // Validate due date (ensure it is not in the past)
    if (dueDate && moment(dueDate).isBefore(moment(), "day")) {
      setError("Due date cannot be in the past.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/todos/create-todo", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
        body: JSON.stringify({
          name: todoName,
          completed: false,
          dueDate: dueDate,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "Failed to create todo.");
      } else {
        setTodoName("");
        setDueDate(""); // Clear the dueDate after submission
        fetchTodos();
      }
    } catch (error) {
      setError("An error occurred while creating the todo.");
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  // Get today's date for the minDate attribute
  const todayDate = moment().format("YYYY-MM-DD");

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={todoName}
          className="input"
          onChange={(e) => setTodoName(e.target.value)}
          placeholder="Enter new todo"
          disabled={loading}
        />

        <input
          type="date"
          value={dueDate}
          className="input"
          onChange={(e) => setDueDate(e.target.value)}
          min={todayDate}
          disabled={loading}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Adding..." : "Add Todo"}
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}
    </form>
  );
}

export default TodoForm;
