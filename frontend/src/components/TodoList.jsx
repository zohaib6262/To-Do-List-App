import React from "react";
import TodoItem from "./TodoItem";
import NoTodos from "./NoTodos";

function TodoList({
  setTodos,
  toggleTodoCompletion,

  todos,
}) {
  if (todos.length === 0 || !todos) {
    return <NoTodos />;
  }
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          setTodos={setTodos}
          key={todo.id}
          todo={todo}
          toggleTodoCompletion={toggleTodoCompletion}
        />
      ))}
    </div>
  );
}

export default TodoList;
