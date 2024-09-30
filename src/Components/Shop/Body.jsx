import { useRef } from "react";

import "./Shop.css";
import items from "./Items";

export default function Body() {
  const containerRef = useRef(null);

  // Scroll the container
  const scroll = (direction) => {
    const scrollAmount = containerRef.current.clientWidth;
    if (direction === "left") {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };
  return (
    <>
      <div className="carousel-wrapper" style={{ position: "relative" }}>
        <button className="carousel-arrow left" onClick={() => scroll("left")}>
          &#8249; {/* Left arrow */}
        </button>

        <div className="clothes-cont" ref={containerRef}>
          {items.map((item, index) => (
            <div className="clothes-item" key={index}>
              <img src={item.image} alt={item.title} />
              <h2>{item.title}</h2>
              <p>{item.description}</p>
              <p className="price">{item.price}</p>
              <button className="shop-button">Add to Cart</button>
            </div>
          ))}
        </div>

        <button
          className="carousel-arrow right"
          onClick={() => scroll("right")}
        >
          &#8250; {/* Right arrow */}
        </button>
      </div>
    </>
  );
}
