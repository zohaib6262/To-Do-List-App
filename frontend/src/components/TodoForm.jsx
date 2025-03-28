import React, { useEffect, useState } from "react";

const TodoForm = ({ addTodo, isEditTodo, updateTodo }) => {
  const [todoName, setTodoName] = useState("");
  useEffect(() => {
    if (isEditTodo) {
      setTodoName(isEditTodo.name);
    }
  }, [isEditTodo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!todoName) {
      return;
    }

    if (isEditTodo) {
      updateTodo({
        ...isEditTodo,
        name: todoName,
      });
    } else {
      console.log("FIjkasdljfl;a", todoName);
      addTodo({
        id: Date.now(),
        name: todoName,
        completed: false,
      });
    }
    console.log("Todo", todoName);

    setTodoName("");
  };

  return (
    <form className="todo-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todoName}
        onChange={(e) => {
          console.log("Set name", todoName);
          setTodoName(e.target.value);
        }}
        placeholder={isEditTodo ? "Edit task" : "Enter new task"}
      />
      <button type="submit">{isEditTodo ? "Update Task" : "Add Task"}</button>
    </form>
  );
};

export default TodoForm;
