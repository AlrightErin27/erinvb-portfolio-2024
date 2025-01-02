require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const bodyParser = require("body-parser");
const path = require("path");

// in root terminal, start back and front ends: npm run dev
//git log:  more robust error handling for reg. shop works locally ***has page working live!

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shop";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const NODE_ENV = process.env.NODE_ENV || "development";

// Headers middleware RIGHT HERE
app.use((req, res, next) => {
  const allowedOrigins =
    NODE_ENV === "production"
      ? ["https://www.erinvanbrunt.com", "https://erinvanbrunt.com"]
      : ["http://localhost:3000"];

  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  } else {
    console.log(
      `Denied access to origin: ${
        origin || "unknown"
      }. Allowed origins are: ${allowedOrigins.join(", ")}`
    );
  }

  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

app.use(bodyParser.json());
const router = express.Router();

app.use("/api", router);

// MongoDB connection with retry logic
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB at:", MONGODB_URI); // Added more detail

    console.log("Environment:", {
      NODE_ENV: process.env.NODE_ENV,
      MONGODB_URI: process.env.MONGODB_URI,
      PORT: process.env.PORT,
    });
  } catch (err) {
    console.error("MongoDB connection error:", err.message); // Added .message
    console.error("MongoDB URI:", MONGODB_URI); // Added to help debug
    // Retry connection after 5 seconds
    setTimeout(connectDB, 5000);
  }
};

connectDB();

//---------------------------------- SCHEMA SECTION ----------------------------------//
//EVIE & CO. SCHEMA 🛍️ 🛒 👚
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

//NUMERIX SCHEMA 🎮
const NumerixScoreSchema = new mongoose.Schema({
  numerixUsername: { type: String, required: true },
  numerixScore: { type: Number, required: true },
  numerixDate: { type: Date, default: Date.now },
});
const NumerixScore = mongoose.model("NumerixScore", NumerixScoreSchema);

//---------------------------------- MIDDLEWARE SECTION ----------------------------------//
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

router.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

//---------------------------------- ROUTES SECTION ----------------------------------//
//EVIE & CO. ROUTE 🛍️ 🛒 👚
//POST
router.post("/register", async (req, res) => {
  console.log("Register endpoint hit with details:", {
    body: req.body,
    method: req.method,
    path: req.path,
    headers: {
      ...req.headers,
      authorization: req.headers.authorization ? "[REDACTED]" : undefined,
    },
    origin: req.get("origin"),
    ip: req.ip,
    timestamp: new Date().toISOString(),
  });

  try {
    // Validate request body
    if (!req.body) {
      console.error("Missing request body");
      return res.status(400).json({
        message: "Missing request body",
        success: false,
        code: "MISSING_BODY",
      });
    }

    const { username, password } = req.body;

    // Validate required fields
    if (!username || !password) {
      console.error("Missing required fields", {
        hasUsername: !!username,
        hasPassword: !!password,
      });
      return res.status(400).json({
        message: "Username and password are required",
        success: false,
        code: "MISSING_FIELDS",
      });
    }

    // Validate field types
    if (typeof username !== "string" || typeof password !== "string") {
      console.error("Invalid field types", {
        usernameType: typeof username,
        passwordType: typeof password,
      });
      return res.status(400).json({
        message: "Invalid username or password format",
        success: false,
        code: "INVALID_TYPES",
      });
    }

    // Check for existing user
    console.log("Checking for existing user:", username);
    const existingUser = await User.findOne({ username });

    if (existingUser) {
      console.log("Username already exists:", username);
      return res.status(400).json({
        message: "Username already exists",
        success: false,
        code: "USERNAME_EXISTS",
      });
    }

    // Hash password
    console.log("Hashing password");
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    console.log("Creating new user");
    const newUser = new User({
      username,
      password: hashedPassword,
      created: new Date(),
    });

    // Save user
    console.log("Saving new user to database");
    await newUser.save();

    console.log("User registered successfully:", username);
    res.status(201).json({
      message: "User registered successfully!",
      success: true,
      code: "REGISTRATION_SUCCESS",
    });
  } catch (error) {
    console.error("Registration error:", {
      error: error.message,
      stack: error.stack,
      type: error.name,
      code: error.code,
    });

    // MongoDB duplicate key error
    if (error.code === 11000) {
      return res.status(400).json({
        message: "Username already exists",
        success: false,
        code: "USERNAME_EXISTS",
      });
    }

    // Generic error response
    res.status(500).json({
      message: "Error registering user",
      success: false,
      code: "SERVER_ERROR",
      error: process.env.NODE_ENV === "development" ? error.message : undefined,
    });
  }
});

//EVIE & CO. ROUTE 🛍️ 🛒 👚
//POST
router.post("/login", async (req, res) => {
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

//EVIE & CO. ROUTE 🛍️ 🛒 👚
//GET
router.get("/user", authMiddleware, async (req, res) => {
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

//EVIE & CO. ROUTE 🛍️ 🛒 👚
//POST
router.post("/purchase", authMiddleware, async (req, res) => {
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

//NUMERIX ROUTE 🎮
//POST
router.post("/numerix/score", async (req, res) => {
  try {
    const { numerixUsername, numerixScore } = req.body;

    // Validate request body
    if (!numerixUsername || !numerixScore) {
      return res.status(400).json({
        message: "Numerix username and score are required",
        success: false,
      });
    }

    // Create new score entry
    const newNumerixScore = new NumerixScore({
      numerixUsername,
      numerixScore,
    });

    // Save to database
    await newNumerixScore.save();

    res.status(201).json({
      message: "Numerix score saved successfully!",
      success: true,
    });
  } catch (error) {
    console.error("Save numerix score error:", error);
    res.status(500).json({
      message: "Error saving numerix score",
      success: false,
    });
  }
});

//NUMERIX ROUTE 🎮
//GET
router.get("/numerix/top-scores", async (req, res) => {
  try {
    const topScores = await NumerixScore.find({})
      .sort({ numerixScore: -1 }) // Sort by score in descending order
      .limit(5); // Limit to top 5 scores

    res.status(200).json(topScores);
  } catch (error) {
    console.error("Error fetching top scores:", error);
    res.status(500).json({ message: "Error fetching top scores" });
  }
});

//---------------------------------- PRODUCTION SECTION ----------------------------------//
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
  console.log(`Server running on port 🚢::${PORT} in ${NODE_ENV} mode`)
);
