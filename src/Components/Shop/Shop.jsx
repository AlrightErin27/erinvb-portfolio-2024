import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Shop.css";
import Header from "./Header";
import Footer from "./Footer";

import items from "./Items";
import icon from "../../Images/Shop/account.png";
// import AutumnAd from "../../Images/Shop/AutumnAd.png";

const Shop = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [lastLogin, setLastLogin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const navigate = useNavigate();
  const containerRef = useRef(null);

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

  // Scroll the container
  const scroll = (direction) => {
    const scrollAmount = containerRef.current.clientWidth;
    if (direction === "left") {
      containerRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
    } else {
      containerRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  function toAccountPage() {
    console.log("HI");
    navigate("/shop/account");
  }

  return (
    <div className="Shop">
      <Header />
      <div className="sub-header">
        {" "}
        {isLoggedIn ? (
          <>
            {/* <p className="shop-p">
              Last login: {new Date(lastLogin).toLocaleString()}
            </p> */}
            {/* <p className="shop-p">
              Past purchases: {purchases.join(", ") || "None"}
            </p> */}
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
      {!isLoggedIn ? (
        <></>
      ) : (
        <>
          <div className="shop-nav">
            <img
              src={icon}
              alt="account icon"
              className="account-icon"
              onClick={toAccountPage}
            />
          </div>
          <div className="carousel-wrapper" style={{ position: "relative" }}>
            <button
              className="carousel-arrow left"
              onClick={() => scroll("left")}
            >
              &#8249; {/* Left arrow */}
            </button>

            <div className="clothes-cont" ref={containerRef}>
              {items.map((item, index) => (
                <div className="clothes-item" key={index}>
                  <img src={item.image} alt={item.title} />
                  <h2>{item.title}</h2>
                  <p>{item.description}</p>
                  <p className="price">{item.price}</p>
                  <button>Add to Cart</button>
                </div>
              ))}
            </div>

            <button
              className="carousel-arrow right"
              onClick={() => scroll("right")}
            >
              &#8250; {/* Right arrow */}
            </button>
          </div>
        </>
      )}
      <div className="footer">
        {isLoggedIn ? <Footer handleLogout={handleLogout} /> : <></>}
      </div>
    </div>
  );
};

export default Shop;
