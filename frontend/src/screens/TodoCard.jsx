import React, { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoFilter from "../components/TodoFilter";
import TodoList from "../components/TodoList";

function TodoCard() {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
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
          setLoading(false);
          setError(data.message || "An error occurred");
          return;
        }

        setTodos(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
        console.log("Error:", error);
      }
    };
    fetchTodos();
  }, []);

  const addTodo = (todo) => {
    setTodos([...todos, todo]);
  };

  const toggleTodoCompletion = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.completed;
    if (filter === "pending") return !todo.completed;
    return true;
  });

  return (
    <div className="form-container">
      <h1 className="appTitle">To-Do List App</h1>
      <TodoForm addTodo={addTodo} />
      <TodoFilter setFilter={setFilter} filterName={filter} />
      {loading && <p>Fetching Todos...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && (
        <TodoList
          setTodos={setTodos}
          todos={filteredTodos}
          toggleTodoCompletion={toggleTodoCompletion}
        />
      )}
    </div>
  );
}

export default TodoCard;
