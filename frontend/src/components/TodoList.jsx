import React from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todos, toggleTodoCompletion, deleteTodo }) => {
  if (todos.length === 0 || !todos) {
    return (
      <div className="no-todos">
        <h3>There is no todo...</h3>
      </div>
    );
  }
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
