import React, { useState } from "react";
import useSignup from "../hooks/useSignup";

const Singup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signup, error, isLoading } = useSignup()


  const handleSubmit = async (e) => {
    e.preventDefault()
    await signup(email, password);

  };

  return (
    <div className="signup">
      <h3>Sign Up</h3>
      <form onSubmit={handleSubmit}>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button disabled={isLoading}>Sign up</button>
        {error && <div className="error">{error}</div>}
      </form>
    </div>
  );
};

export default Singup;
