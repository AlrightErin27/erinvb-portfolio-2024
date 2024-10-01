import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Items from "./Items";

Modal.setAppElement("#root");

function Shop() {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState([]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [lastLogin, setLastLogin] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    let sum = cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(sum);
  }, [cart]);

  const register = async () => {
    try {
      await axios.post("http://localhost:5000/register", {
        username,
        password,
      });
      alert("Registered successfully!");
    } catch (error) {
      alert("Error registering user");
    }
  };

  const login = async () => {
    try {
      const response = await axios.post("http://localhost:5000/login", {
        username,
        password,
      });
      setUser(response.data);
      setLastLogin(response.data.lastLogin);
      setPurchases(response.data.purchases);
    } catch (error) {
      alert("Error logging in");
    }
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem._id === item._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== itemId));
  };

  const checkout = async () => {
    await axios.post("http://localhost:5000/purchase", {
      userId: user.userId,
      cartItems: cart,
    });
    setCart([]);
    alert("Purchase successful!");
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div>
      {!user ? (
        <div>
          <h2>Login / Register</h2>
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
          <button onClick={login}>Login</button>
          <button onClick={register}>Register</button>
        </div>
      ) : (
        <div>
          <button onClick={openModal}>View Cart</button>
          <button onClick={() => setUser(null)}>Logout</button>
          <Items addToCart={addToCart} />
        </div>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal}>
        <h2>Your Cart</h2>
        {cart.map((item) => (
          <div key={item._id}>
            <img src={item.image} alt={item.title} />
            <p>{item.title}</p>
            <p>{item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeFromCart(item._id)}>Remove</button>
          </div>
        ))}
        <h3>Total: ${totalPrice}</h3>
        <button onClick={checkout}>Purchase</button>
        <button onClick={closeModal}>Close</button>
        <p>Last login: {lastLogin}</p>
        <h4>Past Purchases:</h4>
        {purchases.map((purchase, index) => (
          <div key={index}>
            <p>{purchase.title}</p>
            <p>{purchase.price}</p>
          </div>
        ))}
      </Modal>
    </div>
  );
}

export default Shop;
