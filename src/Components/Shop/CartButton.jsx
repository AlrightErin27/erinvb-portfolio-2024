import React from "react";
import "./CSS/Shop.css";
import CartIcon from "../../Images/Shop/account.png";

export default function CartButton({ handleCart }) {
  return (
    <button className="cart-button" onClick={handleCart} aria-label="Open Cart">
      <img src={CartIcon} alt="" className="account-icon" />
    </button>
  );
}
