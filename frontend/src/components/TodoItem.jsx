import React, { useState } from "react";

const TodoItem = ({ todo, toggleTodoCompletion, setTodos }) => {
  const [update, setUpdate] = useState(false);
  const [newName, setNewName] = useState(todo.name);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateHandler = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/todos/update-todo/${todo.id}`,
        {
          method: "PUT",
          body: JSON.stringify({ name: newName, completed: todo.completed }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage?.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.map((item) =>
            item.id === todo.id ? { ...item, name: newName } : item
          )
        );
        setUpdate(false);
      } else {
        setError(data.message || "Error updating todo.");
      }
    } catch (error) {
      setError("An error occurred while updating the todo.");
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteHandler = async (todo) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/todos/delete-todo/${todo.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage?.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.filter((item) => item.id !== todo.id)
        );
      } else {
        setError(data.message || "Error deleting todo.");
      }
    } catch (error) {
      setError("An error occurred while deleting the todo.");
      console.log("Error", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`todo-item`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodoCompletion(todo.id)}
      />
      <span className={`${todo.completed && "todo-completed"}`}>
        {update ? (
          <input
            type="text"
            className=" update-input"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            placeholder="Update Todo"
          />
        ) : (
          todo.name
        )}
      </span>
      <div className="btn-container">
        <button
          onClick={() => {
            if (update) {
              updateHandler();
            } else {
              setUpdate(true);
            }
          }}
          className="btn-update"
          disabled={todo.completed || loading}
        >
          {loading ? "Saving..." : update ? "Save" : "Update"}
        </button>

        <button
          onClick={() => deleteHandler(todo)}
          className="btn-delete"
          disabled={loading}
        >
          {loading ? "Deleting..." : "Delete"}
        </button>
      </div>
      {error && <div className="error-message">{error}</div>}{" "}
    </div>
  );
};

export default TodoItem;
