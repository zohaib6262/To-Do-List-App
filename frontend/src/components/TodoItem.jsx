import React from "react";

const TodoItem = ({ todo, toggleTodoCompletion, deleteTodo }) => {
  console.log("Todo", todo);

  return (
    <div className={`todo-item ${todo.completed ? "completed" : ""} `}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodoCompletion(todo.id)}
      />
      <span>{todo.name}</span>
      <button onClick={() => deleteTodo(todo.id)}>Delete</button>
    </div>
  );
};

export default TodoItem;
