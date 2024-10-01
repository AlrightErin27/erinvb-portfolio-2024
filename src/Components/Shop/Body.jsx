import React, { useRef, useCallback } from "react";
import "./Shop.css";
import items from "./Items";

export default function Body({ addToCart }) {
  const containerRef = useRef(null);

  const scroll = useCallback((direction) => {
    const scrollAmount = containerRef.current.clientWidth;
    containerRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  }, []);

  const handleKeyDown = useCallback(
    (e, direction) => {
      if (e.key === "Enter" || e.key === " ") {
        scroll(direction);
      }
    },
    [scroll]
  );

  return (
    <div className="carousel-wrapper" style={{ position: "relative" }}>
      <button
        className="carousel-arrow left"
        onClick={() => scroll("left")}
        onKeyDown={(e) => handleKeyDown(e, "left")}
        aria-label="Scroll left"
      >
        &#8249;
      </button>

      <div className="clothes-cont" ref={containerRef}>
        {items.map((item, index) => (
          <div className="clothes-item" key={index}>
            <img src={item.image} alt={item.title} />
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <p className="price">${item.price}</p>
            <button
              className="shop-button"
              onClick={() => addToCart(item)}
              aria-label={`Add ${item.title} to cart`}
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      <button
        className="carousel-arrow right"
        onClick={() => scroll("right")}
        onKeyDown={(e) => handleKeyDown(e, "right")}
        aria-label="Scroll right"
      >
        &#8250;
      </button>
    </div>
  );
}
