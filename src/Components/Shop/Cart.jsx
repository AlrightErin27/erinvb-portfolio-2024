import React, { useState, useEffect, useCallback } from "react";
import "./Cart.css";

export default function Cart({
  lastLogin,
  purchases,
  handleCloseCart,
  cartItems,
  setCartItems,
  handlePurchase,
}) {
  const [costTotal, setCostTotal] = useState(0);

  useEffect(() => {
    const totalCost = cartItems.reduce((total, item) => total + item.price, 0);
    setCostTotal(totalCost);
  }, [cartItems]);

  const removeItem = useCallback(
    (index) => {
      setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
    },
    [setCartItems]
  );

  return (
    <div className="Cart" role="dialog" aria-label="Shopping Cart">
      <div className="cart-button-cont">
        <button onClick={handleCloseCart} aria-label="Close Cart">
          X
        </button>
      </div>

      <ul aria-label="Cart Items">
        {cartItems.map((item, i) => (
          <li key={i}>
            <img src={item.image} alt={item.title} className="cart-img" />
            {item.title}, ${item.price}
            <button
              onClick={() => removeItem(i)}
              aria-label={`Remove ${item.title} from cart`}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
      <p>Total: ${costTotal.toFixed(2)}</p>
      <button onClick={handlePurchase} aria-label="Proceed to Checkout">
        Checkout
      </button>

      <p className="shop-p">
        Last login: {new Date(lastLogin).toLocaleString()}
      </p>

      {purchases.length > 0 && (
        <div>
          <h3>Past Purchases:</h3>
          <ul aria-label="Past Purchases">
            {purchases.map((purchase, i) => (
              <li key={i}>
                {purchase.title || "No title"} - ${purchase.price || "No price"}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
