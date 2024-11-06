import { useState, useEffect, useRef } from "react";
import {
  createCommands,
  handleWeatherCommand,
  handleAboutCommand,
} from "./Commands";
import "./Terminal.css";

const Terminal = () => {
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
    setAboutMode
  );

  // Handle command execution
  const executeCommand = async (cmd) => {
    const trimmedCmd = cmd.trim().toLowerCase();

    if (trimmedCmd === "") return [];

    if (weatherMode.active) {
      return handleWeatherCommand(trimmedCmd, weatherMode, setWeatherMode);
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

  // Handle input changes
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="terminal-cont">
      {/* Terminal Header */}
      <div className="terminal-header">
        <div className="terminal-controls">
          <span className="terminal-control terminal-close"></span>
          <span className="terminal-control terminal-minimize"></span>
          <span className="terminal-control terminal-maximize"></span>
        </div>
        <div className="terminal-title">Weather Query Mode</div>
      </div>

      {/* Terminal Content Area */}
      <div className="terminal-content" ref={contentRef}>
        {/* Command History */}
        <div className="terminal-history">
          {history.map((line, index) => (
            <div key={index}>{line}</div>
          ))}
        </div>

        {/* Current Line with Prompt */}
        <div className="terminal-input-line">
          <span className="terminal-prompt">&gt;</span>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            className="terminal-input"
            spellCheck="false"
            autoFocus
          />
          <span
            className={`terminal-cursor ${
              cursorVisible ? "terminal-visible" : ""
            }`}
          >
            {inputValue.length === 0 ? "_" : ""}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Terminal;
