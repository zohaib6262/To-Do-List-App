import React from "react";

const TodoFilter = ({ setFilterName, filterName }) => {
  return (
    <div className="todo-filter">
      <button
        onClick={() => setFilterName("all")}
        className={`button ${filterName === "all" && "all"}`}
      >
        All
      </button>
      <button
        onClick={() => setFilterName("pending")}
        className={`button ${filterName === "pending" && "pending"}`}
      >
        {" "}
        Pending
      </button>
      <button
        onClick={() => setFilterName("completed")}
        className={`button ${filterName === "completed" && "completed"}`}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilter;
