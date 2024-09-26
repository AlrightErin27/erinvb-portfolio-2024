import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Shop.css";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import Cart from "./Cart";

const Shop = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [lastLogin, setLastLogin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cart, setCart] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    await axios.post("http://localhost:5001/register", { username, password });
    alert("Registration successful! Please log in.");
  };

  const handleLogin = async () => {
    const response = await axios.post("http://localhost:5001/login", {
      username,
      password,
    });
    setToken(response.data.token);
    setPurchases(response.data.purchases);
    setLastLogin(response.data.lastLogin);
    setIsLoggedIn(true);
  };

  const handlePurchase = async (item) => {
    const response = await axios.post("http://localhost:5001/purchase", {
      token,
      item,
    });
    setPurchases(response.data.purchases);
  };

  const handleLogout = () => {
    setToken("");
    setIsLoggedIn(false);
    setPurchases([]);
    setLastLogin(null);
    navigate("/shop");
  };

  return (
    <div className="Shop">
      <Header setCart={setCart} />
      <div className="sub-header">
        {" "}
        {isLoggedIn ? (
          <>
            {cart ? (
              <Cart purchases={purchases} lastLogin={lastLogin} />
            ) : (
              <Body />
            )}
          </>
        ) : (
          <>
            <h2 className="shop-subheader">Login or Register</h2>
            <input
              className="shop-input"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              className="shop-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div>
              {" "}
              <button className="shop-button" onClick={handleRegister}>
                Register
              </button>
              <button className="shop-button" onClick={handleLogin}>
                Log In
              </button>
            </div>
          </>
        )}
      </div>

      <div className="footer">
        {isLoggedIn ? <Footer handleLogout={handleLogout} /> : <></>}
      </div>
    </div>
  );
};

export default Shop;
