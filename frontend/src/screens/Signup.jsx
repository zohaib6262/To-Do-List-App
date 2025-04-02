import React, { useState } from "react";

const Signup = ({ toggleForm }) => {
  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [backendError, setBackendError] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const signUpFormHandleChange = (key, value) => {
    setSignUpForm({
      ...signUpForm,
      [key]: value,
    });
  };

  const submitHandle = async (e) => {
    e.preventDefault();

    let newError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    if (!signUpForm.email.trim()) {
      newError.email = "Email is required";
    }

    if (!signUpForm.password.trim()) {
      newError.password = "Password is required";
    }

    if (signUpForm.password !== signUpForm.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    if (newError.email || newError.password || newError.confirmPassword) {
      setError(newError);
      return;
    }

    setSuccessMessage("");
    setError({
      email: "",
      password: "",
      confirmPassword: "",
    });

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      });
      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setBackendError(data.message);
        }

        return;
      }

      if (response.ok) {
        setSuccessMessage("Signup successful! You can now log in.");
        setSignUpForm({
          email: "",
          password: "",
          confirmPassword: "",
        });
        toggleForm();
      }
    } catch (error) {
      setError({
        email: "Something went wrong. Please try again later.",
        password: "",
        confirmPassword: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={submitHandle}>
      <h2>Sign Up</h2>

      {successMessage && <p className="success">{successMessage}</p>}
      {backendError && <p className="error">{backendError}</p>}

      <input
        type="email"
        className="input"
        placeholder="Email"
        value={signUpForm.email}
        onChange={(e) => signUpFormHandleChange("email", e.target.value)}
      />
      {error.email && <p className="error">*{error.email}</p>}

      <input
        type="password"
        className="input"
        placeholder="Password"
        value={signUpForm.password}
        onChange={(e) => signUpFormHandleChange("password", e.target.value)}
      />
      {error.password && <p className="error">*{error.password}</p>}

      <input
        type="password"
        className="input"
        placeholder="Confirm Password"
        value={signUpForm.confirmPassword}
        onChange={(e) =>
          signUpFormHandleChange("confirmPassword", e.target.value)
        }
      />
      {error.confirmPassword && (
        <p className="error">*{error.confirmPassword}</p>
      )}

      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>

      <p>
        Already have an account?
        <span className="toggle-form" onClick={toggleForm}>
          Login
        </span>
      </p>
    </form>
  );
};

export default Signup;
