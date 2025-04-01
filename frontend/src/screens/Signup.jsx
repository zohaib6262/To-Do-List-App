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

  // Handle input changes
  const signUpFormHandleChange = (key, value) => {
    setSignUpForm({
      ...signUpForm,
      [key]: value,
    });
  };

  // Form submission handler
  const submitHandle = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    let newError = {
      email: "",
      password: "",
      confirmPassword: "",
    };

    // Validate Email
    if (!signUpForm.email.trim()) {
      newError.email = "Email is required";
    }

    // Validate Password
    if (!signUpForm.password.trim()) {
      newError.password = "Password is required";
    }

    // Validate Confirm Password
    if (signUpForm.password !== signUpForm.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    // If there are any errors, update the state and return
    if (newError.email || newError.password || newError.confirmPassword) {
      setError(newError);
      return;
    }

    // Clear errors and proceed if validation passes
    setError({
      email: "",
      password: "",
      confirmPassword: "",
    });

    console.log("Form Submitted:", signUpForm);
    // You can perform your API request here (e.g., sending data to a server)
  };

  return (
    <form className="form" onSubmit={submitHandle}>
      <h2>Sign Up</h2>

      {/* Email Field */}
      <div>
        <input
          type="email"
          className="input"
          placeholder="Email"
          value={signUpForm.email}
          onChange={(e) => signUpFormHandleChange("email", e.target.value)}
        />
        {error.email && <p className="error">*{error.email}</p>}
      </div>

      {/* Password Field */}
      <div>
        <input
          type="password"
          className="input"
          placeholder="Password"
          value={signUpForm.password}
          onChange={(e) => signUpFormHandleChange("password", e.target.value)}
        />
        {error.password && <p className="error">*{error.password}</p>}
      </div>

      <div>
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
      </div>

      <button className="btn" type="submit">
        Sign Up
      </button>
      <p>
        Already have an account?{" "}
        <span className="toggle-form" onClick={toggleForm}>
          Login
        </span>
      </p>
    </form>
  );
};

export default Signup;
