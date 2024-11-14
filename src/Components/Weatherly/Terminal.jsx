import React, { useState, useEffect, useRef } from "react";

import {
  createCommands,
  handleWeatherCommand,
  handleAboutCommand,
} from "./TerminalCommands";
import "./Terminal.css";

const Terminal = ({ onNewLocation }) => {
  const [cursorVisible, setCursorVisible] = useState(true);
  const [inputValue, setInputValue] = useState("");
  const [commandHistory, setCommandHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [weatherMode, setWeatherMode] = useState({
    active: false,
    step: null,
    country: null,
  });
  const [aboutMode, setAboutMode] = useState({
    active: false,
  });
  const contentRef = useRef(null);

  // Initial welcome message
  const WELCOME_MESSAGE = [
    "Welcome to Forecast Terminal",
    "Type 'help' for available commands",
  ];

  const [history, setHistory] = useState(WELCOME_MESSAGE);

  // Get commands with current weatherMode state
  const COMMANDS = createCommands(
    weatherMode,
    setWeatherMode,
    aboutMode,
    setAboutMode,
    onNewLocation
  );

  // Handle command execution
  const executeCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "") return [];

    if (weatherMode.active) {
      return handleWeatherCommand(
        trimmedCmd,
        weatherMode,
        setWeatherMode,
        onNewLocation
      );
    }

    if (aboutMode.active) {
      return handleAboutCommand(trimmedCmd, aboutMode, setAboutMode);
    }

    const command = COMMANDS[trimmedCmd];
    if (command) {
      return command();
    }

    return [
      `Command not found: ${trimmedCmd}`,
      "Type 'help' for available commands",
    ];
  };

  // Handle command input
  const handleCommand = async () => {
    if (inputValue.trim()) {
      const commandResponse = await executeCommand(inputValue);
      const newHistory = [
        ...history,
        <span className="terminal-command">
          {"> "}

          {inputValue}
        </span>,
        ...commandResponse,
      ];
      setHistory(newHistory);
      setCommandHistory((prev) => [...prev, inputValue]);
      setInputValue("");
      setHistoryIndex(-1);
    }
  };

  // Cursor blink effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);
    return () => clearInterval(interval);
  }, []);

  // Scroll to bottom when history changes
  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollTop = contentRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    const scrollToBottom = () => {
      if (contentRef.current) {
        contentRef.current.scrollTop = contentRef.current.scrollHeight;
      }
    };

    scrollToBottom();

    // Add event listener for content changes
    const observer = new MutationObserver(scrollToBottom);

    if (contentRef.current) {
      observer.observe(contentRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [history, inputValue]);

  // Handle keyboard events
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleCommand();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInputValue(commandHistory[commandHistory.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue("");
      }
    }
  };

  const handleInputChange = (e) => {
    // Ensure we're getting plain text input
    const plainText = e.target.value.replace(/[^\x20-\x7E]/g, ""); // Only allow ASCII printable characters
    setInputValue(plainText);
  };

  return (
    <div className="w-terminal">
      <div className="w-terminal-header">
        <div className="w-terminal-controls">
          <button className="w-terminal-control w-terminal-close" />
          <button className="w-terminal-control w-terminal-minimize" />
          <button className="w-terminal-control w-terminal-maximize" />
        </div>
        <div className="w-terminal-title">Weather Query Mode</div>
      </div>

      <div className="w-terminal-content" ref={contentRef}>
        <div className="w-terminal-history">
          {history.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>
        <div className="w-terminal-input-line">
          <span className="w-terminal-prompt">
            &gt;
            {inputValue.length === 0 && (
              <span
                className={`w-terminal-cursor ${
                  cursorVisible ? "visible" : ""
                }`}
              >
                _
              </span>
            )}
          </span>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="w-terminal-input"
            spellCheck="false"
            autoFocus
          />
          {inputValue.length > 0 && (
            <span
              className={`w-terminal-cursor ${cursorVisible ? "visible" : ""}`}
            >
              _
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Terminal;
