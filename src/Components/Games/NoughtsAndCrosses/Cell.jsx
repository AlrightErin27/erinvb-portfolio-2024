import React from "react";
import "./NoughtsAndCrosses.css";

export default function Cell({ value, onClick }) {
  return (
    <button className="cell" onClick={onClick}>
      {value}
    </button>
  );
}
