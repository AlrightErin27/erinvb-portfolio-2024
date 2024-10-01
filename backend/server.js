const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();

app.use(cors());
app.use(bodyParser.json());

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  purchases: Array,
  lastLogin: Date,
});

const User = mongoose.model("User", UserSchema);

mongoose.connect("mongodb://localhost:27017/shop");

// User registration
app.post("/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({
    username,
    password: hashedPassword,
    purchases: [],
    lastLogin: new Date(),
  });
  await newUser.save();
  res.status(201).json({ message: "User registered successfully!" });
});

// User login
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, "secretKey", {
    expiresIn: "1h",
  });
  user.lastLogin = new Date();
  await user.save();
  res.json({ token, lastLogin: user.lastLogin, purchases: user.purchases });
});

// Get user data (cart and past purchases)
app.get("/user/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json({ lastLogin: user.lastLogin, purchases: user.purchases });
});

// Purchase items
app.post("/purchase", async (req, res) => {
  const { userId, cartItems } = req.body;
  const user = await User.findById(userId);
  user.purchases.push(...cartItems);
  await user.save();
  res.json({ message: "Purchase successful!" });
});

app.listen(5001, () => console.log("Server started on port 5001"));
