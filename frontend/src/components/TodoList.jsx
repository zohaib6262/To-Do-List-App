import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleTodoCompletion, deleteTodo }) => {
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodoCompletion={toggleTodoCompletion}
          deleteTodo={deleteTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;
