import React, { useState, useEffect } from "react";
import moment from "moment";

const TodoItem = ({ todo, fetchTodos }) => {
  const [update, setUpdate] = useState(false);
  const [newName, setNewName] = useState(todo.name);
  const [newDueDate, setNewDueDate] = useState(todo.dueDate || "");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);

  const todayDate = moment().format("YYYY-MM-DD");

  useEffect(() => {
    if (todo.dueDate) {
      setNewDueDate(moment(todo.dueDate).format("YYYY-MM-DD"));
    }
  }, [todo.dueDate]);

  const updateHandler = async (todoId, newName, newDueDate, todoCompleted) => {
    setUpdateLoading(true);
    setError(null);
    const formattedDueDate = newDueDate
      ? moment(newDueDate).format("YYYY-MM-DD")
      : null;
    try {
      const response = await fetch(
        `http://localhost:3000/todos/update-todo/${todoId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: newName,
            completed: todoCompleted,
            dueDate: formattedDueDate,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage?.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        await fetchTodos();
        setUpdate(false);
      } else {
        setError(data.message || "Error updating todo.");
      }
    } catch (error) {
      setError("An error occurred while updating the todo.");
      console.log("Error", error);
    } finally {
      setUpdateLoading(false);
    }
  };

  const deleteHandler = async (todo) => {
    setDeleteLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/todos/delete-todo/${todo.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage?.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        await fetchTodos();
      } else {
        setError(data.message || "Error deleting todo.");
      }
    } catch (error) {
      setError("An error occurred while deleting the todo.");
      console.log("Error", error);
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleCompletionHandler = async () => {
    const updatedCompleted = !todo.completed;
    await updateHandler(todo.id, todo.name, newDueDate, updatedCompleted);
  };

  return (
    <div className={`todo-item`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompletionHandler}
      />
      <span className={`${todo.completed && "todo-completed"}`}>
        {update ? (
          <>
            <input
              type="text"
              className="update-input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Update Todo"
            />
            <input
              type="date"
              className="update-input"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              min={todayDate}
            />
          </>
        ) : (
          <div>
            <span style={{ fontWeight: "bold" }}>
              {todo.name.length > 20
                ? todo.name.slice(0, 20) + "..."
                : todo.name}
              :
            </span>
            {newDueDate && (
              <span className="due-date">
                {moment(newDueDate).format("MMMM Do YYYY")}
              </span>
            )}
          </div>
        )}
      </span>
      <div className="btn-container">
        <button
          onClick={() => {
            if (update) {
              updateHandler(todo.id, newName, newDueDate, todo.completed);
            } else {
              setUpdate(true);
            }
          }}
          className="btn-update"
          disabled={todo.completed || updateLoading}
        >
          {updateLoading ? "Saving..." : update ? "Save" : "Update"}
        </button>

        <button
          onClick={() => deleteHandler(todo)}
          className="btn-delete"
          disabled={deleteLoading}
        >
          {deleteLoading ? "Deleting..." : "Delete"}
        </button>
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default TodoItem;
