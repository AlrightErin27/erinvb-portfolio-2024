require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const helmet = require("helmet");

// in root terminal, start back and front ends: npm run dev

const app = express();
const PORT = process.env.PORT || 5001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/shop";
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const NODE_ENV = process.env.NODE_ENV || "development";

if (NODE_ENV === "production") {
  // In your Express app configuration
  if (NODE_ENV === "production") {
    if (NODE_ENV === "production") {
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
                "*.vimeo.com",
                "f.vimeocdn.com",
                "*.vimeocdn.com",
                "www.gstatic.com",
                "vimeocdn.com",
                "*.virtualearth.net",
                "cdn.tensorflow.org",
              ],
              styleSrc: [
                "'self'",
                "'unsafe-inline'",
                "fonts.googleapis.com",
                "https://fonts.googleapis.com",
              ],
              fontSrc: [
                "'self'",
                "fonts.gstatic.com",
                "https://fonts.gstatic.com",
                "data:",
                "https:",
                "blob:",
              ],
              imgSrc: [
                "'self'",
                "data:",
                "blob:",
                "*.vimeocdn.com",
                "*.vimeo.com",
                "*.virtualearth.net",
                "*.cesium.com",
                "*.medium.com",
                "medium.com",
              ],
              frameSrc: [
                "'self'",
                "player.vimeo.com",
                "*.vimeo.com",
                "*.giphy.com",
                "vimeo.com",
              ],
              childSrc: ["'self'", "player.vimeo.com", "blob:"],
              connectSrc: [
                "'self'",
                "http://localhost:5001",
                "https://localhost:5001",
                "https://www.erinvanbrunt.com",
                "https://erinvanbrunt.com",
                "vimeo.com",
                "*.vimeo.com",
                "player.vimeo.com",
                "*.vimeocdn.com",
                "fresnel.vimeocdn.com",
                "*.cesium.com",
                "api.cesium.com", // Cesium Assets
                "assets.cesium.com", // Cesium Assets
                "ion.cesium.com", // Cesium Assets
                "*.virtualearth.net",
                "*.arcgisonline.com",
                "*.openweathermap.org",
                "cdn.tensorflow.org",
                "https://api.rss2json.com",
                "https://medium.com",
                "medium.com",
                "*.medium.com",
              ],
              workerSrc: ["'self'", "blob:", "cdn.tensorflow.org"],
              objectSrc: ["'none'"],
              manifestSrc: ["'self'"],
            },
          },
        })
      );
    }
  }
} else {
  app.use(
    helmet({
      contentSecurityPolicy: false,
    })
  );
}

// CORS configuration should be after helmet but before routes
const allowedOrigins =
  NODE_ENV === "production"
    ? ["https://www.erinvanbrunt.com", "https://erinvanbrunt.com"]
    : ["http://localhost:3000"];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(bodyParser.json());

const router = express.Router();
app.use("/api", router);

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

//-----------WEATHERLY SCHEMA ☔ 🧤 ❄️----------------------------------------------------------------//
const WeatherAISchema = new mongoose.Schema({
  weatherPattern: {
    temperature: Number,
    condition: String,
    humidity: Number,
    windSpeed: Number,
    uvIndex: Number,
    timeOfDay: String,
    airQuality: Number,
  },
  suggestions: [
    {
      type: String,
      confidence: Number,
      category: {
        type: String,
        enum: ["clothing", "activities", "considerations"],
      },
    },
  ],
  feedback: {
    positiveCount: { type: Number, default: 0 },
    negativeCount: { type: Number, default: 0 },
    totalInteractions: { type: Number, default: 0 },
  },
  lastUpdated: { type: Date, default: Date.now },
});
const WeatherAI = mongoose.model("WeatherAI", WeatherAISchema);
//-----------------------------------------------------------------------------------------------------//

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

//EVIE & CO. ROUTE 🛍️ 🛒 👚
router.post("/register", async (req, res) => {
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

//EVIE & CO. ROUTE 🛍️ 🛒 👚
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

//-----------WEATHERLY ROUTES ☔ 🧤 ❄️----------------------------------------------------------------//
router.post("/weather/train", async (req, res) => {
  try {
    const { weatherData, suggestions, feedback } = req.body;
    const weatherPattern = new WeatherAI({
      weatherPattern: {
        temperature: weatherData.temp.celsius,
        condition: weatherData.description,
        humidity: weatherData.humidity,
        windSpeed: weatherData.wind_speed,
        uvIndex: weatherData.uv || 0,
        timeOfDay: weatherData.time,
        airQuality: weatherData.airQuality || 0,
      },
      suggestions: suggestions.map((s) => ({
        type: s.suggestion,
        confidence: s.confidence,
        category: s.category,
      })),
      feedback: {
        positiveCount: feedback.positive ? 1 : 0,
        negativeCount: feedback.negative ? 1 : 0,
        totalInteractions: 1,
      },
    });
    await weatherPattern.save();
    res.status(201).json({ message: "AI training data saved successfully" });
  } catch (error) {
    console.error("Weather AI training error:", error);
    res.status(500).json({ message: "Error saving AI training data" });
  }
});

router.get("/weather/suggestions", async (req, res) => {
  try {
    const { temperature, condition, humidity, windSpeed, time } = req.query;

    // Find similar weather patterns
    const similarPatterns = await WeatherAI.find({
      "weatherPattern.temperature": {
        $gte: Number(temperature) - 5,
        $lte: Number(temperature) + 5,
      },
      "weatherPattern.condition": condition,
    })
      .sort("-feedback.positiveCount")
      .limit(5);

    // Get most successful suggestions
    const suggestions = similarPatterns.reduce((acc, pattern) => {
      pattern.suggestions.forEach((suggestion) => {
        if (suggestion.confidence > 0.7) {
          // Only high confidence suggestions
          acc.push({
            type: suggestion.type,
            confidence: suggestion.confidence,
            category: suggestion.category,
          });
        }
      });
      return acc;
    }, []);

    res.json({ suggestions });
  } catch (error) {
    console.error("Weather suggestion error:", error);
    res.status(500).json({ message: "Error getting weather suggestions" });
  }
});

router.post("/weather/feedback", async (req, res) => {
  try {
    const { patternId, isPositive } = req.body;

    const pattern = await WeatherAI.findById(patternId);
    if (!pattern) {
      return res.status(404).json({ message: "Pattern not found" });
    }

    if (isPositive) {
      pattern.feedback.positiveCount += 1;
    } else {
      pattern.feedback.negativeCount += 1;
    }
    pattern.feedback.totalInteractions += 1;
    pattern.lastUpdated = new Date();

    await pattern.save();
    res.json({ message: "Feedback recorded successfully" });
  } catch (error) {
    console.error("Weather feedback error:", error);
    res.status(500).json({ message: "Error recording feedback" });
  }
});
//---------------------------------------------------------------------------------------------------//

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
