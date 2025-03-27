import React from "react";
import TodoItem from "./TodoItem";
import NoTodos from "./NoTodos";

function TodoList({ todos, toggleTodoCompletion, deleteTodo, setTodoToEdit }) {
  if (todos.length === 0 || !todos) {
    return <NoTodos />;
  }
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodoCompletion={toggleTodoCompletion}
          deleteTodo={deleteTodo}
          setTodoToEdit={setTodoToEdit}
        />
      ))}
    </div>
  );
}

export default TodoList;
