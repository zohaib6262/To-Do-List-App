import React from "react";

function TodoFilter({ setFilter, filterName }) {
  return (
    <div className="todo-filter">
      <button
        onClick={() => setFilter("all")}
        className={`button ${filterName === "all" && "all"}`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("pending")}
        className={`button ${filterName === "pending" && "pending"}`}
      >
        Pending
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`button ${filterName === "completed" && "completed"}`}
      >
        Completed
      </button>
    </div>
  );
}

export default TodoFilter;
