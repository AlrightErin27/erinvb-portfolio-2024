const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");

// Initialize Express app
const app = express();
app.use(express.json());
app.use(cors());

//in terminal
//"ps aux | grep mongod"; && in backend of this project run "node server.js"

// Connect to MongoDB (replace with your MongoDB URI)
mongoose
  .connect("mongodb://localhost:27017/shopDB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Define User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: String,
  lastLogin: Date,
  purchases: [String],
});

const User = mongoose.model("User", userSchema);

// Register Route
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
  res.json({ message: "User registered successfully" });
});

// Login Route
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) return res.status(400).json({ message: "User not found" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

  user.lastLogin = new Date();
  await user.save();

  const token = jwt.sign({ id: user._id }, "secret", { expiresIn: "1h" });
  res.json({ token, purchases: user.purchases, lastLogin: user.lastLogin });
});

// Purchase Route
app.post("/purchase", async (req, res) => {
  const { token, item } = req.body;
  try {
    const decoded = jwt.verify(token, "secret");
    const user = await User.findById(decoded.id);
    user.purchases.push(item);
    await user.save();
    res.json({ message: "Purchase successful", purchases: user.purchases });
  } catch (error) {
    res.status(401).json({ message: "Unauthorized" });
  }
});

// Start the server on port 5001
app.listen(5001, () => {
  console.log("Backend server running on port 5001");
});
