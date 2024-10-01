import React from "react";
import "./Shop.css";
import ELogo from "../../Images/Shop/EvieLogo.png";

export default function Header() {
  return (
    <header className="header">
      <div className="shop-nav"></div>
      <img className="e-logo" src={ELogo} alt="Evie Logo" />
    </header>
  );
}
