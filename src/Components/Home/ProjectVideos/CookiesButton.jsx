import React, { useState } from "react";
import "./CookiesButton.css";

const CookiesButton = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="cookies-container">
      <button
        className={`cookies-toggle-button ${isExpanded ? "expanded" : ""}`}
        onClick={toggleExpand}
        aria-expanded={isExpanded}
        aria-controls="cookie-content"
      >
        Help
      </button>

      {isExpanded && (
        <div className="cookies-content" id="cookie-content" aria-live="polite">
          <div className="cookies-header">
            <h2 className="cookies-title">Cookie Settings Notice</h2>
          </div>

          <div className="cookies-body">
            <p className="cookies-description">
              This site contains embedded content that requires third-party
              cookies to function properly. You may need to adjust your browser
              settings if videos are not displaying correctly.
            </p>

            <div className="info-box info-box-primary">
              <h3 className="info-box-title">
                How to enable third-party cookies:
              </h3>
              <ul className="info-box-list">
                <li>
                  Look for the cookie settings icon in your browser's address
                  bar
                </li>
                <li>Click "Site not working?" if videos aren't playing</li>
                <li>Select "Allow third-party cookies for this site"</li>
              </ul>
            </div>

            <div className="info-box info-box-secondary">
              <h3 className="info-box-title">Why do you see this message?</h3>
              <p>
                Chrome and other browsers are updating their cookie policies to
                enhance user privacy. This may affect how embedded videos and
                other third-party content function on our site.
              </p>
            </div>
          </div>

          <button
            className="cookies-close-button"
            onClick={toggleExpand}
            aria-label="Close cookie settings"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default CookiesButton;
