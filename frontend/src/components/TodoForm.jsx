import React, { useState, useEffect } from "react";

function TodoForm({ addTodo, updateTodo, todoToEdit }) {
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    if (todoToEdit) {
      setTodoName(todoToEdit.name);
    }
  }, [todoToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!todoName) return;

    if (todoToEdit) {
      updateTodo({
        ...todoToEdit,
        name: todoName,
      });
    } else {
      addTodo({
        id: Date.now(),
        name: todoName,
        completed: false,
      });
    }

    setTodoName("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoName}
        onChange={(e) => setTodoName(e.target.value)}
        placeholder={todoToEdit ? "Edit todo" : "Enter new todo"}
      />
      <button type="submit">{todoToEdit ? "Update Todo" : "Add Todo"}</button>
    </form>
  );
}

export default TodoForm;
