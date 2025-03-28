import React, { useState } from "react";

const TodoItem = ({ todo, toggleTodoCompletion, setTodos, deleteTodo }) => {
  const [update, setUpdate] = useState(false);
  const [newName, setNewName] = useState(todo.name); // State to handle the updated name

  const updateHandler = async () => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${todo.id}`, {
        method: "PUT",
        body: JSON.stringify({ name: newName, completed: todo.completed }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log("Data", data);
      setTodos((prevTodos) =>
        prevTodos.map((item) =>
          item.id === todo.id ? { ...item, name: newName } : item
        )
      );
      setUpdate(false); // Close the edit input after update
    } catch (error) {
      console.log("Error", error);
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
          className="btn btn-update"
          disabled={todo.completed}
        >
          {update ? "Save" : "Update"}
        </button>

        <button onClick={() => deleteTodo(todo)} className="btn btn-delete">
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
