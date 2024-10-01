import React from "react";
import "./Shop.css";

export default function Footer({ handleLogout }) {
  return (
    <footer>
      <button
        className="shop-button"
        onClick={handleLogout}
        aria-label="Log Out"
      >
        Log Out
      </button>
    </footer>
  );
}
