import React, { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";
import TodoList from "../components/TodoList";

function TodoCard() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchTodos = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:3000/todos/get-todos", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + localStorage?.getItem("token"),
        },
      });
      const data = await response.json();
      if (!response.ok) {
        setError(data.message || "An error occurred");
        return;
      }

      setTodos(data);
    } catch (error) {
      setError(error.message || "An error occurred while fetching todos.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="form-container">
      <h1 className="appTitle">To-Do List App</h1>
      <TodoForm fetchTodos={fetchTodos} />
      <TodoFilter setFilter={setFilter} filterName={filter} />
      {loading && <p>Fetching Todos...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <TodoList fetchTodos={fetchTodos} todos={filteredTodos} />
      )}
    </div>
  );
}

export default TodoCard;
