require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shop";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

app.use(cors());
app.use(bodyParser.json());

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  purchases: [
    {
      title: String,
      price: Number,
      image: String,
    },
  ],
  lastLogin: { type: Date, default: Date.now },
});

const User = mongoose.model("User", UserSchema);

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Authentication token missing" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userId);

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Please authenticate." });
  }
};

app.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(400).json({ message: "Username already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Error registering user" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    user.lastLogin = new Date();
    await user.save();

    res.json({
      token,
      lastLogin: user.lastLogin,
      purchases: user.purchases,
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Error logging in" });
  }
});

app.get("/user", authMiddleware, async (req, res) => {
  try {
    res.json({
      lastLogin: req.user.lastLogin,
      purchases: req.user.purchases,
    });
  } catch (error) {
    console.error("Get user data error:", error);
    res.status(500).json({ message: "Error fetching user data" });
  }
});

app.post("/purchase", authMiddleware, async (req, res) => {
  try {
    const { cartItems } = req.body;

    if (!Array.isArray(cartItems) || cartItems.length === 0) {
      return res.status(400).json({ message: "Invalid cart items" });
    }

    const validatedItems = cartItems.map((item) => ({
      title: String(item.title),
      price: Number(item.price),
      image: String(item.image),
    }));

    req.user.purchases = [...req.user.purchases, ...validatedItems];
    await req.user.save();

    res.json({
      message: "Purchase successful!",
      purchases: req.user.purchases,
    });
  } catch (error) {
    console.error("Purchase error:", error);
    res.status(500).json({
      message: "An error occurred while processing your purchase",
      error: error.message,
    });
  }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
