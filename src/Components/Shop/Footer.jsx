import { useState, useEffect } from "react";
import "./CSS/Footer.css";

import p1 from "../../Images/Shop/Banner/1.png";
import p2 from "../../Images/Shop/Banner/2.png";
import p3 from "../../Images/Shop/Banner/4.png";
import p4 from "../../Images/Shop/Banner/5.png";
import p5 from "../../Images/Shop/Banner/6.png";
import p6 from "../../Images/Shop/Banner/7.png";

export default function Footer({ handleLogout }) {
  const images = [p1, p2, p3, p4, p5, p6];

  return (
    <footer>
      <div className="magazine-scroll">
        <div className="scroll-track">
          {/* First set */}
          {images.map((img, index) => (
            <div key={`first-${index}`} className="magazine-item">
              <img src={img} alt={`Magazine cover ${index + 1}`} />
            </div>
          ))}
          {/* Second set for seamless loop */}
          {images.map((img, index) => (
            <div key={`second-${index}`} className="magazine-item">
              <img src={img} alt={`Magazine cover ${index + 1}`} />
            </div>
          ))}
        </div>
      </div>
      <p className="about">
        Evie & Co. is the epitome of sophisticated fashion, effortlessly merging
        timeless elegance with bold, modern aesthetics. Drawing inspiration from
        London's iconic mod movement, the romantic allure of Victorian design,
        and the audacious spirit of punk, the brand creates pieces that
        transcend trends. Each collection is meticulously crafted, offering
        refined silhouettes with unexpected details, perfect for those who seek
        to make a statement. Known worldwide for its distinctive blend of
        classic and avant-garde styles, Evie & Co. embodies a fearless approach
        to luxury fashion.
      </p>
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
