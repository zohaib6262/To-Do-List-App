import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./screens/Login";
import Signup from "./screens/Signup";
import TodoCard from "./screens/TodoCard";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [showTodoCard, setShowTodoCard] = useState(false);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (!token) {
      return;
    }
    setToken(localStorage);
  }, []);

  return (
    <div className="app-container">
      {!showTodoCard ||
        (!token && (
          <div className="form-container">
            {showLogin ? (
              <Login
                toggleForm={() => setShowLogin(false)}
                setTodo={() => setShowTodoCard(true)}
              />
            ) : (
              <Signup toggleForm={() => setShowLogin(true)} />
            )}
          </div>
        ))}
      {showTodoCard || (token && <TodoCard />)}
    </div>
  );
};

export default App;
