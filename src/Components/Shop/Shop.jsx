import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Shop = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [lastLogin, setLastLogin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate = useNavigate();

  const itemsForSale = ["Cool T-Shirt", "Stylish Hat", "Hip Sunglasses"];

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
    <div>
      <h1>Welcome to the Shop</h1>

      {isLoggedIn ? (
        <>
          <p>Last login: {new Date(lastLogin).toLocaleString()}</p>
          <p>Past purchases: {purchases.join(", ") || "None"}</p>
          <button onClick={handleLogout}>Log Out</button>
        </>
      ) : (
        <>
          <h2>Login or Register</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleRegister}>Register</button>
          <button onClick={handleLogin}>Log In</button>
        </>
      )}

      <h2>Shop Items</h2>
      <ul>
        {itemsForSale.map((item, index) => (
          <li key={index}>
            {item}{" "}
            {isLoggedIn ? (
              <button onClick={() => handlePurchase(item)}>Purchase</button>
            ) : (
              <span>(Login to purchase)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Shop;
