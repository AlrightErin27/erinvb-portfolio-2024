import React, { useState, useEffect } from "react";
import "./CSS/Body.css";
import items from "./Items";

/**
 * Body Component - Displays a carousel of shop items
 *
 * This component implements a carousel that shows 3 items at a time on desktop
 * and 1 item on mobile devices. It uses a simple index-based navigation system
 * with smooth transitions between items.
 *
 * @param {Object} props
 * @param {Function} props.addToCart - Function to handle adding items to cart
 */
export default function Body({ addToCart }) {
  // Track the current starting index of visible items
  const [currentIndex, setCurrentIndex] = useState(0);

  // Track viewport size for responsive design
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  /**
   * Handle viewport resize events to toggle between mobile and desktop layouts
   * Sets up event listener on mount and cleans it up on unmount
   */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    // Cleanup function to remove event listener
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  /**
   * Advance to the next set of items
   * When at the end of the array, loops back to the beginning
   */
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      // If we've reached the end, loop back to start
      return nextIndex >= items.length ? 0 : nextIndex;
    });
  };

  /**
   * Go back to the previous set of items
   * When at the start of the array, loops to the end
   */
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextIndex = prevIndex - 1;
      // If we've reached the start, loop to end
      return nextIndex < 0 ? items.length - 1 : nextIndex;
    });
  };

  /**
   * Calculate which items should be visible in the carousel
   * Returns an array of 1 item for mobile or 3 items for desktop
   * Uses modulo operator to handle wrapping around the array
   *
   * @returns {Array} Array of items to display
   */
  const getVisibleItems = () => {
    if (isMobile) {
      // On mobile, show only one item
      return [items[currentIndex]];
    }

    // On desktop, show three items
    const visibleItems = [];
    for (let i = 0; i < 3; i++) {
      // Use modulo to wrap around to start of array when needed
      const index = (currentIndex + i) % items.length;
      visibleItems.push(items[index]);
    }
    return visibleItems;
  };

  return (
    <div className="carousel-container">
      {/* Left navigation arrow */}
      <button
        className="carousel-arrow left"
        onClick={prevSlide}
        aria-label="Previous items"
      >
        &#8249;
      </button>

      {/* Main carousel display */}
      <div className="carousel-items">
        {getVisibleItems().map((item, index) => (
          <div
            key={`${item.title}-${currentIndex}-${index}`}
            className="item-card"
            style={{
              // Apply transition effect to each card
              transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
              opacity: 0,
              transform: "scale(0.95)",
              animation:
                "fadeSlideIn 0.5s cubic-bezier(0.4, 0, 0.2, 1) forwards",
            }}
          >
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

      {/* Right navigation arrow */}
      <button
        className="carousel-arrow right"
        onClick={nextSlide}
        aria-label="Next items"
      >
        &#8250;
      </button>
    </div>
  );
}
