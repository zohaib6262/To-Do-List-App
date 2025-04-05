import React from "react";

const TodoFilter = ({ setFilter, filterName }) => {
  return (
    <div className="flex gap-4 mb-6">
      <button
        onClick={() => setFilter("all")}
        className={`px-4 py-2 rounded-md ${
          filterName === "all"
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        All
      </button>
      <button
        onClick={() => setFilter("pending")}
        className={`px-4 py-2 rounded-md ${
          filterName === "pending"
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Pending
      </button>
      <button
        onClick={() => setFilter("completed")}
        className={`px-4 py-2 rounded-md ${
          filterName === "completed"
            ? "bg-indigo-600 text-white"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200"
        }`}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilter;
