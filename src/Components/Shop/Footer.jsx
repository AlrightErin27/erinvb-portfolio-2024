import { useState, useEffect } from "react";
import "./CSS/Footer.css";

import image1 from "../../Images/Shop/Banner/1.png";
import image2 from "../../Images/Shop/Banner/2.png";
import image3 from "../../Images/Shop/Banner/3.png";
import image4 from "../../Images/Shop/Banner/4.png";
import image5 from "../../Images/Shop/Banner/5.png";
import image6 from "../../Images/Shop/Banner/6.png";
import image7 from "../../Images/Shop/Banner/7.png";

export default function Footer({ handleLogout }) {
  const images = [image5, image4, image1, image2, image3, image6, image7];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 10000);

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <footer>
      <div className="banner">
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Magazine cover ${index + 1}`}
            className={`banner-image ${
              index === currentImageIndex ? "active" : ""
            }`}
          />
        ))}
      </div>
      <p className="about">
        Evie & Co. is the epitome of sophisticated fashion, effortlessly merging
        timeless elegance with bold, modern aesthetics. Drawing inspiration from
        London’s iconic mod movement, the romantic allure of Victorian design,
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
