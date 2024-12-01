import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CSS/Shop.css";

import Header from "./Header";
import Entry from "./Entry";
import Body from "./Body";
import Footer from "./Footer";
import Cart from "./Cart";
import CartButton from "./CartButton";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";
console.log("API URL:", API_URL);

const Shop = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [lastLogin, setLastLogin] = useState(null);
  const [loggedInUsername, setLoggedInUsername] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = useCallback(() => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setPurchases([]);
    setLastLogin(null);
    setCartItems([]);
    setLoggedInUsername("");
    navigate("/shop");
  }, [navigate]);

  const fetchUserData = useCallback(
    async (token) => {
      try {
        const response = await axios.get(`${API_URL}/user`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPurchases(response.data.purchases);
        setLastLogin(response.data.lastLogin);
        setLoggedInUsername(response.data.username);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Failed to fetch user data", error);
        handleLogout();
      } finally {
        setIsLoading(false);
      }
    },
    [handleLogout]
  );

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchUserData(token);
    } else {
      setIsLoading(false);
    }
  }, [fetchUserData]);

  const handleRegister = async () => {
    try {
      console.log("Attempting to register with URL:", `${API_URL}/register`);
      await axios.post(`${API_URL}/register`, { username, password });
      alert("Registration successful! Please log in.");
    } catch (error) {
      console.error("Registration error:", error);
      alert(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
    console.log("API_URL in Shop.jsx:", API_URL);
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
      setLoggedInUsername(username);
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
      // alert("Purchase successful!");
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

  const handleCart = () => setShowCart(!showCart);

  const addToCart = (item) => setCartItems((prevItems) => [...prevItems, item]);

  return (
    <div className="Shop">
      <Header />
      <div className="sub-header">
        {!isLoading && (
          <>
            {isLoggedIn ? (
              <div className="body-con">
                <div className="icon-con">
                  <CartButton handleCart={handleCart} />
                </div>
                {showCart && (
                  <Cart
                    username={loggedInUsername}
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
              <Entry
                username={username}
                setUsername={setUsername}
                password={password}
                setPassword={setPassword}
                handleRegister={handleRegister}
                handleLogin={handleLogin}
              />
            )}
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
