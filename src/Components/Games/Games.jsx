import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./Games.css";
import FolderIcon from "../../Images/Games/folder.png";

export default function Games() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");
  const [currentTime, setCurrentTime] = useState(new Date());
  const [scrollPosition, setScrollPosition] = useState(0);
  const linksListRef = useRef(null);
  const scrollbarRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleScroll = () => {
    if (linksListRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = linksListRef.current;
      const scrollPercentage =
        (scrollTop / (scrollHeight - clientHeight)) * 100;
      setScrollPosition(scrollPercentage);
    }
  };

  const handleScrollbarClick = (e) => {
    const { top, height } = scrollbarRef.current.getBoundingClientRect();
    const clickPosition = (e.clientY - top) / height;
    scrollToPosition(clickPosition);
  };

  const handleScrollbarMouseDown = () => {
    setIsDragging(true);
  };

  const handleScrollbarMouseUp = () => {
    setIsDragging(false);
  };

  const handleScrollbarMouseMove = (e) => {
    if (isDragging) {
      const { top, height } = scrollbarRef.current.getBoundingClientRect();
      const dragPosition = (e.clientY - top) / height;
      scrollToPosition(dragPosition);
    }
  };

  const scrollToPosition = (percentage) => {
    if (linksListRef.current) {
      const { scrollHeight, clientHeight } = linksListRef.current;
      const scrollPosition = percentage * (scrollHeight - clientHeight);
      linksListRef.current.scrollTop = scrollPosition;
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleScrollbarMouseMove);
    document.addEventListener("mouseup", handleScrollbarMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleScrollbarMouseMove);
      document.removeEventListener("mouseup", handleScrollbarMouseUp);
    };
  }, [isDragging]);

  const games = [
    { id: "concentration", name: "Concentration" },
    { id: "noughts-&-crosses", name: "Noughts & Crosses" },
    { id: "crossword", name: "Crossword" },
    { id: "cemetery-run", name: "Cemetery Run" },
  ];

  return (
    <div className="Games">
      <div className="window">
        <div className="title-bar">
          <div className="title-border">
            <img src={FolderIcon} alt="icon" className="folder-img" />
            <span>Games Folder</span>
          </div>
        </div>
        <div className="window-body">
          <div className="folder-section">
            <div className="folder-header">
              <span>Links...</span>
              <button
                className="button"
                onClick={() => navigate(`/games/${select}`)}
              >
                Select
              </button>
            </div>
            <div className="folder-content">
              <div
                className="links-list"
                ref={linksListRef}
                onScroll={handleScroll}
              >
                {games.map((game) => (
                  <div
                    key={game.id}
                    className={select === game.id ? "selected-li" : "link-li"}
                    onClick={() => setSelect(game.id)}
                  >
                    {game.name}
                  </div>
                ))}
              </div>
              <div
                className="retro-scrollbar"
                ref={scrollbarRef}
                onClick={handleScrollbarClick}
                onMouseDown={handleScrollbarMouseDown}
              >
                <div
                  className="scrollbar-thumb"
                  style={{ top: `${scrollPosition}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="status-bar">
          <span>{currentTime.toLocaleTimeString()}</span>
          <span>{currentTime.toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
