import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Shop.css";
import EvieLogo from "../../Images/Shop/EvieLogo.png";
// import AutumnAd from "../../Images/Shop/AutumnAd.png";
import img1 from "../../Images/Shop/fuzzymoto.jpg";
import img2 from "../../Images/Shop/coat.jpg";
import img3 from "../../Images/Shop/golddress.jpg";
import img4 from "../../Images/Shop/stripedsweater.jpg";
import img5 from "../../Images/Shop/plaidcoat.jpg";
import img6 from "../../Images/Shop/skirt.jpg";
import img7 from "../../Images/Shop/ruffledress.jpg";

const Shop = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [purchases, setPurchases] = useState([]);
  const [lastLogin, setLastLogin] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [clothes, setClothes] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const items = [
    {
      image: img1,
      title: "Faux Fur Moto Jacket",
      description:
        "Luxurious wooly moto jacket in cream, featuring silver hardware for a sleek, edgy look.",
      price: "$120",
    },
    {
      image: img2,
      title: "Camel Trench",
      description:
        "Classic silk-lined camel wool trench coat, midi-length with tortoise shell buttons for timeless elegance.",
      price: "$250",
    },
    {
      image: img3,
      title: "Gold Metallic Dress",
      description:
        "Stunning gold metallic layered dress with a high collar and lace underskirt for a glamorous touch.",
      price: "$600",
    },
    {
      image: img4,
      title: "Knit Crewneck Sweater",
      description:
        "Cozy Scottish wool jumper with a chunky collar and slouched fit, perfect for effortless style.",
      price: "$200",
    },
    {
      image: img5,
      title: "Plaid Wool Coat",
      description:
        "Tailored plaid wool coat with a double-breasted design and structured shoulders for a vintage feel.",
      price: "$300",
    },
    {
      image: img6,
      title: "Pleated Unisex Skirt",
      description: "FIXME",
      price: "$210",
    },
    {
      image: img7,
      title: "Boho Romantic Ruffle Dress",
      description: "FIXME",
      price: "$400",
    },
  ];
  const navigate = useNavigate();
  const containerRef = useRef(null);

  useEffect(() => {
    const arr = items.map(({ image, title, description, price }, i) => ({
      img: image,
      title: title,
      desc: description,
      price: price,
      idx: i,
    }));
    setClothes(arr);
  }, []);

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

  // Scroll the container to the left or right
  // Scroll the container to the left or right
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

  return (
    <div className="Shop">
      <div className="header">
        <img className="evie-logo" src={EvieLogo} alt="evie-logo" />
      </div>
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
            {/* <button className="shop-button" onClick={handleLogout}>
              Log Out
            </button> */}
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
      )}
    </div>
  );
};

export default Shop;
