import React, { useState, useEffect, useRef } from "react";
import "./Terminal.css";

const Terminal = () => {
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  const handleTerminalClick = () => {
    inputRef.current?.focus();
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && inputValue.trim()) {
      setCommandHistory([...commandHistory, inputValue]);
      setInputValue("");
    }
  };

  return (
    <div className="w-terminal" onClick={handleTerminalClick}>
      <div className="w-terminal-header">
        <div className="w-terminal-controls">
          <button className="w-terminal-control w-terminal-close" />
          <button className="w-terminal-control w-terminal-minimize" />
          <button className="w-terminal-control w-terminal-maximize" />
        </div>
        <div className="w-terminal-title">Terminal</div>
      </div>

      <div className="w-terminal-content">
        <div className="w-terminal-history">
          Welcome to the terminal. Type 'help' for available commands.
        </div>

        {commandHistory.map((cmd, index) => (
          <div key={index} className="w-terminal-history">
            <span className="w-terminal-prompt">&gt; </span>
            <span className="w-terminal-user-text">{cmd}</span>
          </div>
        ))}

        <div className="w-terminal-input-line">
          <span className="w-terminal-prompt">&gt; </span>
          <span className="w-terminal-input-wrapper">
            <span className="w-terminal-user-text">{inputValue}</span>
            <span
              className={`w-terminal-cursor ${
                isCursorVisible ? "visible" : ""
              }`}
            >
              _
            </span>
          </span>
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={handleKeyPress}
            className="w-terminal-input"
            spellCheck="false"
            autoFocus
          />
        </div>
      </div>
    </div>
  );
};

export default Terminal;
