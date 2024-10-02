import React from "react";
import "./Entry.css";

export default function Entry({
  username,
  setUsername,
  password,
  setPassword,
  handleRegister,
  handleLogin,
}) {
  return (
    <div className="entry-container">
      <h2 className="entry-header">Login or Register</h2>
      <form className="entry-form">
        <input
          className="entry-input"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          aria-label="Username"
        />
        <input
          className="entry-input"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-label="Password"
        />
        <div className="entry-buttons">
          <button
            className="entry-button"
            onClick={handleRegister}
            type="button"
          >
            Register
          </button>
          <button className="entry-button" onClick={handleLogin} type="button">
            Log In
          </button>
        </div>
      </form>
    </div>
  );
}
