import React, { useState } from "react";

const Login = ({ toggleForm, setTodo }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [backendError, setBackendError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const loginFormHandleChange = (key, value) => {
    setLoginForm({
      ...loginForm,
      [key]: value,
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    let newError = {
      email: "",
      password: "",
    };

    if (!loginForm.email.trim()) {
      newError.email = "Email is required";
    }

    if (!loginForm.password.trim()) {
      newError.password = "Password is required";
    }

    if (newError.email || newError.password) {
      setError(newError);
      return;
    }

    setSuccessMessage("");
    setError({
      email: "",
      password: "",
    });

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginForm),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setBackendError(data.message);
        }
        return;
      }
      if (response.ok) {
        setSuccessMessage("Login successful! Redirecting...");
        setLoginForm({
          email: "",
          password: "",
        });

        setTimeout(() => {
          localStorage.setItem("token", data.token);
          setTodo();
        }, 1000);
      }
    } catch (error) {
      setError({
        email: "Something went wrong. Please try again later.",
        password: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={submitHandle}>
      <h2>Login</h2>

      {successMessage && <p className="success">{successMessage}</p>}
      {backendError && <p className="error">{backendError}</p>}

      <input
        type="email"
        className="input"
        placeholder="Email"
        value={loginForm.email}
        onChange={(e) => loginFormHandleChange("email", e.target.value)}
      />
      {error.email && <p className="error">*{error.email}</p>}

      <input
        type="password"
        className="input"
        placeholder="Password"
        value={loginForm.password}
        onChange={(e) => loginFormHandleChange("password", e.target.value)}
      />
      {error.password && <p className="error">*{error.password}</p>}

      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Logging In..." : "Log In"}
      </button>

      <p>
        Don't have an account?
        <span className="toggle-form" onClick={toggleForm}>
          Sign Up
        </span>
      </p>
    </form>
  );
};

export default Login;
