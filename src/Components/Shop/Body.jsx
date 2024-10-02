import React, { useRef, useCallback, useEffect, useState } from "react";
import "./CSS/Body.css";
import items from "./Items";

export default function Body({ addToCart }) {
  const containerRef = useRef(null);
  const [duplicatedItems, setDuplicatedItems] = useState([]);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    // Duplicate the items array to create a seamless loop
    setDuplicatedItems([...items, ...items, ...items]);
  }, []);

  const scroll = useCallback(
    (direction) => {
      if (isScrolling) return;
      setIsScrolling(true);

      const container = containerRef.current;
      const itemWidth = container.children[0].offsetWidth;
      const gap = 20; // Assuming 20px gap between items, adjust if different
      const scrollAmount = itemWidth + gap;
      const maxScroll = container.scrollWidth - container.clientWidth;

      let newScrollPosition;

      if (direction === "left") {
        newScrollPosition = container.scrollLeft - scrollAmount;
        if (newScrollPosition <= 0) {
          // If we've scrolled to the start, prepare to jump to the middle set
          container.style.scrollBehavior = "auto";
          container.scrollLeft = maxScroll / 3;
          setTimeout(() => {
            container.style.scrollBehavior = "smooth";
            container.scrollLeft -= scrollAmount;
          }, 0);
        } else {
          container.scrollLeft = newScrollPosition;
        }
      } else {
        newScrollPosition = container.scrollLeft + scrollAmount;
        if (newScrollPosition >= maxScroll) {
          // If we've scrolled to the end, prepare to jump to the first set
          container.style.scrollBehavior = "auto";
          container.scrollLeft = maxScroll / 3;
          setTimeout(() => {
            container.style.scrollBehavior = "smooth";
            container.scrollLeft += scrollAmount;
          }, 0);
        } else {
          container.scrollLeft = newScrollPosition;
        }
      }

      // Reset scrolling state after animation
      setTimeout(() => {
        setIsScrolling(false);
      }, 300); // Adjust this timeout to match your CSS transition duration
    },
    [isScrolling]
  );

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
        {duplicatedItems.map((item, index) => (
          <div className="clothes-item" key={`${item.title}-${index}`}>
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
