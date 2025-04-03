import React, { useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton";

const Login = ({ toggleForm, setToken }) => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [backendError, setBackendError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const loginFormHandleChange = (key, value) => {
    setLoginForm({
      ...loginForm,
      [key]: value,
    });
  };
  const googleLoginHandler = async () => {
    setGoogleLoading(true);
    try {
      const response = await fetch("http://localhost:3000/auth", {
        method: "POST",
      });
      const data = await response.json();
      console.log("Data received from backend:", data);

      if (data.url) {
        window.location.href = data.url;
      } else {
        console.error("OAuth URL not found in response", data);
      }
    } catch (error) {
      console.error("Error fetching data from backend:", error);
      setBackendError("Something went wrong. Please try again later.");
    } finally {
      setGoogleLoading(false);
    }
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
      const response = await fetch("http://localhost:3000/auth/login", {
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
          setToken(data.token);
          localStorage.setItem("token", data.token);
        }, 500);
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
      <button
        className="btn google-btn"
        onClick={googleLoginHandler}
        disabled={googleLoading}
      >
        {googleLoading ? "Redirecting..." : "Continue with Google"}
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
