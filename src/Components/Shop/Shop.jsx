import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Shop.css";

import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";
import Cart from "./Cart";
import CartButton from "./CartButton";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

const Shop = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [lastLogin, setLastLogin] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      fetchUserData(token);
    }
  }, []);

  const fetchUserData = async (token) => {
    try {
      const response = await axios.get(`${API_URL}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setPurchases(response.data.purchases);
      setLastLogin(response.data.lastLogin);
    } catch (error) {
      console.error("Failed to fetch user data", error);
      handleLogout();
    }
  };

  const handleRegister = async () => {
    try {
      await axios.post(`${API_URL}/register`, { username, password });
      alert("Registration successful! Please log in.");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_URL}/login`, {
        username,
        password,
      });
      localStorage.setItem("token", response.data.token);
      setIsLoggedIn(true);
      setPurchases(response.data.purchases);
      setLastLogin(response.data.lastLogin);
    } catch (error) {
      alert(error.response?.data?.message || "Login failed. Please try again.");
    }
  };

  const handlePurchase = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      await axios.post(
        `${API_URL}/purchase`,
        { cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setCartItems([]);
      setPurchases([...purchases, ...cartItems]);
      alert("Purchase successful!");
    } catch (error) {
      if (error.response?.status === 401) {
        handleLogout();
        alert("Your session has expired. Please log in again.");
      } else {
        alert(
          error.response?.data?.message ||
            "Failed to complete purchase. Please try again."
        );
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setPurchases([]);
    setLastLogin(null);
    setCartItems([]);
    navigate("/shop");
  };

  const handleCart = () => setShowCart(!showCart);

  const addToCart = (item) => setCartItems((prevItems) => [...prevItems, item]);

  return (
    <div className="Shop">
      <Header />
      <div className="sub-header">
        {isLoggedIn ? (
          <div className="body-con">
            <div className="icon-con">
              <CartButton handleCart={handleCart} />
            </div>
            {showCart && (
              <Cart
                lastLogin={lastLogin}
                purchases={purchases}
                handleCloseCart={() => setShowCart(false)}
                cartItems={cartItems}
                setCartItems={setCartItems}
                handlePurchase={handlePurchase}
              />
            )}
            <Body addToCart={addToCart} />
          </div>
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
        {isLoggedIn && <Footer handleLogout={handleLogout} />}
      </div>
    </div>
  );
};

export default Shop;
