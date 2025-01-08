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

// TO DO:
//let user add item to cart by clicking image of clothing
//remove any alerts and replace with modals
//add function to be able to click clothing and it pops up in its own page

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:5001";

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
        //🪱
        const response = await axios.get(`${API_URL}/api/user`, {
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
    if (!username || !password) {
      alert("Please provide both username and password");
      return;
    }

    try {
      console.log("Starting registration attempt", {
        //🪱
        url: `${API_URL}/api/register`,
        username,
      });

      const response = await axios.post(
        //🪱
        `${API_URL}/api/register`,
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201 || response.status === 200) {
        alert("Registration successful! Please log in.");
      }
    } catch (error) {
      console.error("Registration error:", error);
      alert("Registration failed. Please try again.");
    }
  };

  const handleLogin = async () => {
    try {
      //🪱
      const response = await axios.post(`${API_URL}/api/login`, {
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
        //🪱
        `${API_URL}/api/purchase`,
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
