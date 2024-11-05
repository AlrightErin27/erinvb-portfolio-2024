import React, { useState, useEffect } from "react";
import "./CSS/Cart.css";

export default function Cart({
  username,
  lastLogin,
  purchases,
  handleCloseCart,
  cartItems,
  setCartItems,
  handlePurchase,
}) {
  const [groupedItems, setGroupedItems] = useState({});
  const [totalCost, setTotalCost] = useState(0);
  const [showThankYouMessage, setShowThankYouMessage] = useState(false);

  useEffect(() => {
    const grouped = cartItems.reduce((acc, item) => {
      const key = `${item.title}-${item.price}`;
      if (!acc[key]) {
        acc[key] = { ...item, quantity: 1 };
      } else {
        acc[key].quantity += 1;
      }
      return acc;
    }, {});

    setGroupedItems(grouped);

    const total = Object.values(grouped).reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    setTotalCost(total);
  }, [cartItems]);

  const removeItem = (key) => {
    const updatedGroupedItems = { ...groupedItems };
    if (updatedGroupedItems[key].quantity > 1) {
      updatedGroupedItems[key].quantity -= 1;
    } else {
      delete updatedGroupedItems[key];
    }

    const updatedCartItems = Object.values(updatedGroupedItems).flatMap(
      (item) => Array(item.quantity).fill({ ...item, quantity: undefined })
    );

    setCartItems(updatedCartItems);
  };

  const isCartEmpty = Object.keys(groupedItems).length === 0;

  const handleCheckout = () => {
    handlePurchase();
    setShowThankYouMessage(true);
    setTimeout(() => {
      setShowThankYouMessage(false);
      handleCloseCart();
    }, 2000);
  };

  if (showThankYouMessage) {
    return (
      <div
        className="Cart no-background"
        role="dialog"
        aria-label="Shopping Cart"
      >
        <p className="thank-you-message">
          Thank you for shopping at Evie & Co.!
        </p>
      </div>
    );
  }

  return (
    <div className="Cart" role="dialog" aria-label="Shopping Cart">
      <div className="cart-button-cont">
        <button onClick={handleCloseCart} aria-label="Close Cart">
          X
        </button>
      </div>

      <p className="shop-p">
        Welcome, {username}! Last login: {new Date(lastLogin).toLocaleString()}
      </p>

      {isCartEmpty ? (
        <p className="empty-cart-message">Your cart is empty.</p>
      ) : (
        <>
          <ul aria-label="Cart Items">
            {Object.entries(groupedItems).map(([key, item]) => (
              <li key={key}>
                <img src={item.image} alt={item.title} className="cart-img" />
                <div className="item-details">
                  <span className="item-title">{item.title}</span>
                  <span className="item-price">${item.price}</span>
                  {item.quantity > 1 && (
                    <span className="item-quantity">x {item.quantity}</span>
                  )}
                </div>
                <button
                  onClick={() => removeItem(key)}
                  aria-label={`Remove one ${item.title} from cart`}
                >
                  Remove One
                </button>
              </li>
            ))}
          </ul>
          <p className="total-cost">Total: ${totalCost.toFixed(2)}</p>
          <button onClick={handleCheckout} aria-label="Proceed to Checkout">
            Checkout
          </button>
        </>
      )}

      {purchases.length > 0 && (
        <div className="past-purchases">
          <h3>Past Purchases:</h3>
          <ul aria-label="Past Purchases">
            {purchases.map((purchase, i) => (
              <li key={i}>
                <span className="purchase-title">
                  {purchase.title || "No title"}
                </span>{" "}
                <span className="purchase-price">
                  ${purchase.price || "No price"}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
