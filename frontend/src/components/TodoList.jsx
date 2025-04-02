import React from "react";
import TodoItem from "./TodoItem";
import NoTodos from "./NoTodos";

function TodoList({
  fetchTodos,

  todos,
}) {
  if (todos.length === 0 || !todos) {
    return <NoTodos />;
  }
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} fetchTodos={fetchTodos} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
