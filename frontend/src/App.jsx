import React from "react";
import TodoForm from "./components/TodoForm";

const App = () => {
  return (
    <div className="mainApp">
      <div className="card">
        <h1 className="appTitle">To-Do List App</h1>
        <TodoForm />
      </div>
    </div>
  );
};

export default App;
