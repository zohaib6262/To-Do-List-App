import React from "react";
import TodoItem from "./TodoItem";
import NoTodos from "./NoTodos";

const TodoList = ({ todos, fetchTodos }) => {
  if (todos.length === 0) {
    return <NoTodos />;
  }

  return (
    <div className="space-y-4">
      {todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} fetchTodos={fetchTodos} />
      ))}
    </div>
  );
};

export default TodoList;
