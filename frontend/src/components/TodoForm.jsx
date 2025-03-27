import React, { useState } from "react";

const TodoForm = ({ addTodo }) => {
  const [todoName, setTodoName] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoName) {
      return;
    }
    console.log("Todo name", todoName);

    addTodo({
      id: Date.now(),
      name: todoName,
      completed: false,
    });
    setTodoName("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        placeholder="Enter new todo"
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default TodoForm;
