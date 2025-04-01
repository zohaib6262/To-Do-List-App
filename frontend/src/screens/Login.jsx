import React, { useState } from "react";

const Login = ({ toggleForm }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  return (
    <div className="form">
      <h2>Login</h2>
      <input type="email" placeholder="Email" className="input" />
      <input type="password" placeholder="Password" className="input" />
      <button className="btn">Login</button>
      <p>
        Don't have an account?{" "}
        <span className="toggle-form" onClick={toggleForm}>
          Sign up
        </span>
      </p>
    </div>
  );
};

export default Login;
