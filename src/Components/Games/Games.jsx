import "./Games.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import FolderIcon from "../../Images/Games/folder.png";
import ScrollImg from "../../Images/Games/scroll.png";

export default function Games() {
  const navigate = useNavigate();
  const [select, setSelect] = useState("");

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
              <div className="links-list">
                <div
                  className={
                    select === "concentration" ? "selected-li" : "link-li"
                  }
                  onClick={() => setSelect("concentration")}
                >
                  Concentration
                </div>
                <div
                  className={
                    select === "noughts-&-crosses" ? "selected-li" : "link-li"
                  }
                  onClick={() => setSelect("noughts-&-crosses")}
                >
                  Noughts & Crosses
                </div>
                <div
                  className={select === "crossword" ? "selected-li" : "link-li"}
                  onClick={() => setSelect("crossword")}
                >
                  Crossword
                </div>
                <div
                  className={
                    select === "buffy-crossword" ? "selected-li" : "link-li"
                  }
                  onClick={() => setSelect("buffy-crossword")}
                >
                  BuffyCrossword
                </div>
              </div>

              <img src={ScrollImg} alt="scroll bar" className="scroll-bar" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
