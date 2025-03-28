import React from "react";

const TodoItem = ({
  todo,
  toggleTodoCompletion,
  deleteTodo,
  setIsEditTodo,
}) => {
  console.log("Todo", todo);

  return (
    <div className={`todo-item `}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodoCompletion(todo.id)}
      />
      <span className={` ${todo.completed && "todo-completed"}`}>
        {todo.name}
      </span>
      <div className="btn-container">
        <button
          onClick={() => setIsEditTodo(todo)}
          className="btn btn-update"
          disabled={todo.completed && true}
        >
          Update
        </button>

        <button
          onClick={() => deleteTodo(todo.id)}
          className="btn btn-delete"
          disabled={todo.completed && true}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
