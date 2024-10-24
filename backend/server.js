require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shop";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV === "production") {
  // Production CSP configuration
  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: [
            "'self'",
            "'unsafe-inline'",
            "'unsafe-eval'",
            "player.vimeo.com",
            "f.vimeocdn.com",
            "*.vimeocdn.com",
            "www.gstatic.com",
            "vimeocdn.com",
          ],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            "fonts.googleapis.com",
            "https://fonts.googleapis.com",
          ],
          fontSrc: ["'self'", "fonts.gstatic.com", "https://fonts.gstatic.com"],
          imgSrc: [
            "'self'",
            "data:",
            "blob:",
            "*.vimeocdn.com",
            "*.vimeo.com",
            "*.medium.com",
            "medium.com",
            "*.giphy.com",
          ],
          mediaSrc: [
            "'self'",
            "data:",
            "blob:",
            "*.vimeocdn.com",
            "*.vimeo.com",
          ],
          frameSrc: [
            "'self'",
            "player.vimeo.com",
            "*.vimeo.com",
            "*.giphy.com",
          ],
          childSrc: ["'self'", "player.vimeo.com"],
          connectSrc: [
            "'self'",
            "https://www.erinvanbrunt.com",
            "https://erinvanbrunt.com",
            "vimeo.com",
            "player.vimeo.com",
            "*.vimeocdn.com",
            "fresnel.vimeocdn.com",
            "https://fresnel.vimeocdn.com",
            "https://api.rss2json.com",
            "https://medium.com",
            "medium.com",
            "*.medium.com",
          ],
          workerSrc: ["'self'", "blob:"],
          objectSrc: ["'none'"],
          manifestSrc: ["'self'"],
        },
      },
    })
  );
} else {
  // Development CSP configuration
  app.use(helmet());
}

// CORS configuration should be after helmet but before routes
app.use(
  cors({
    origin: ["https://www.erinvanbrunt.com", "https://erinvanbrunt.com"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

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
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired" });
    }
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

// Serve static files and handle React routing in production
if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../build", "index.html"));
  });
}

// Enhanced error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong!",
    error: NODE_ENV === "development" ? err.message : undefined,
  });
});

app.listen(PORT, () =>
  console.log(`Server running on port ${PORT} in ${NODE_ENV} mode`)
);
