const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
const BASE_URL = "http://api.openweathermap.org/data/2.5";
const GEO_URL = "http://api.openweathermap.org/geo/1.0";

// Helper function for proper capitalization
const properCapitalize = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Validate and get country/city coordinates
const getCoordinates = async (city, country) => {
  try {
    const response = await fetch(
      `${GEO_URL}/direct?q=${city},${country}&limit=1&appid=${API_KEY}`
    );
    const data = await response.json();

    if (data && data.length > 0) {
      return {
        valid: true,
        lat: data[0].lat,
        lon: data[0].lon,
        name: data[0].name,
        country: data[0].country,
      };
    }
    return { valid: false };
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return { valid: false };
  }
};

// Get current weather data
const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await fetch(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    const data = await response.json();

    if (data) {
      const localTime = new Date(data.dt * 1000).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      // Convert Celsius to Fahrenheit
      const tempC = Math.round(data.main.temp);
      const tempF = Math.round((tempC * 9) / 5 + 32);
      const feelsLikeC = Math.round(data.main.feels_like);
      const feelsLikeF = Math.round((feelsLikeC * 9) / 5 + 32);

      return {
        temp: { celsius: tempC, fahrenheit: tempF },
        feels_like: { celsius: feelsLikeC, fahrenheit: feelsLikeF },
        humidity: data.main.humidity,
        wind_speed: Math.round(data.wind.speed),
        description: data.weather[0].description,
        icon: data.weather[0].icon,
        time: localTime,
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
};

// Format weather data for display
const formatWeatherData = (weather) => {
  return [
    "Current Weather:",
    `Local Time: ${weather.time}`,
    `Temperature: ${weather.temp.celsius}°C / ${weather.temp.fahrenheit}°F`,
    `Feels like: ${weather.feels_like.celsius}°C / ${weather.feels_like.fahrenheit}°F`,
    `Humidity: ${weather.humidity}%`,
    `Wind Speed: ${weather.wind_speed} m/s`,
    `Conditions: ${weather.description}`,
  ];
};

// Weather command handler
const handleWeatherCommand = async (
  input,
  weatherMode,
  setWeatherMode,
  onNewLocation
) => {
  if (!weatherMode.active) {
    setWeatherMode({ active: true, step: "country", country: null });
    return ["Please enter a country name:"];
  }

  const properInput = properCapitalize(input);

  if (weatherMode.step === "country") {
    const isValidCountry = await validateCountry(input.toLowerCase());
    if (isValidCountry) {
      setWeatherMode({
        active: true,
        step: "city",
        country: properInput,
      });
      return [`Country set to: ${properInput}`, "Please enter a city name:"];
    } else {
      setWeatherMode({ active: false, step: null, country: null });
      return [
        `Invalid country: ${properInput}`,
        "Weather command cancelled. Try again with 'weather'",
      ];
    }
  }

  if (weatherMode.step === "city") {
    const locationData = await getCoordinates(
      input.toLowerCase(),
      weatherMode.country.toLowerCase()
    );

    if (locationData.valid) {
      const weather = await getCurrentWeather(
        locationData.lat,
        locationData.lon
      );
      setWeatherMode({ active: false, step: null, country: null });

      // Add this line to update the globe
      onNewLocation(locationData.lat, locationData.lon);

      return [
        `Fetching weather for ${properInput}, ${weatherMode.country}:`,
        ...formatWeatherData(weather),
      ];
    } else {
      setWeatherMode({ active: false, step: null, country: null });
      return [
        `Location not found: ${properInput}, ${weatherMode.country}`,
        "Weather command cancelled. Try again with 'weather'",
      ];
    }
  }
};

// About command handler
const handleAboutCommand = async (input, aboutMode, setAboutMode) => {
  if (!aboutMode.active) {
    setAboutMode({ active: true });
    return [
      "Forecast - Interactive Weather Visualization",
      "Version 1.0.0",
      "",
      "Select an option to learn more:",
      "1. globe    - About the 3D globe visualization",
      "2. weather  - About the weather API integration",
      "3. ai       - About the TensorFlow.js integration",
      "",
      "Enter your choice (globe/weather/ai):",
    ];
  }

  const choice = input.trim().toLowerCase();

  switch (choice) {
    case "globe":
      setAboutMode({ active: false });
      return [
        "Globe Visualization Technology",
        "--------------------------------",
        "• Built with react-globe.gl and Three.js",
        "• Real-time 3D rendering with WebGL",
        "• High-resolution Earth texture mapping",
        "• Smooth rotation and zoom controls",
        "• Responsive design for all devices",
        "• Custom point and marker system",
        "• Optimized for performance",
        "",
        "Features:",
        "• Interactive 3D navigation",
        "• Location markers with weather data",
        "• Atmospheric effects",
        "• Day/night cycle visualization",
        "• Temperature gradient overlay",
      ];

    case "weather":
      setAboutMode({ active: false });
      return [
        "Weather Data Integration",
        "------------------------",
        "• Powered by OpenWeather API",
        "• Real-time weather data updates",
        "• 5-day weather forecasting",
        "• Global coverage with local precision",
        "",
        "Data points available:",
        "• Temperature (°C/°F)",
        "• Humidity (%)",
        "• Wind speed and direction",
        "• Precipitation probability",
        "• Atmospheric pressure",
        "• Cloud cover percentage",
        "• Visibility range",
        "",
        "Update frequency: Every 10 minutes",
      ];

    case "ai":
      setAboutMode({ active: false });
      return [
        "TensorFlow.js Integration",
        "------------------------",
        "• Powered by TensorFlow.js v4.10.0",
        "• Client-side machine learning capabilities",
        "• Real-time weather pattern analysis",
        "",
        "Features:",
        "• Pattern recognition in weather data",
        "• Temperature trend predictions",
        "• Anomaly detection",
        "• Local weather pattern learning",
        "",
        "Model Architecture:",
        "• Deep neural network with LSTM layers",
        "• Optimized for browser performance",
        "• Lightweight model design (< 5MB)",
        "• WebGL acceleration support",
      ];

    default:
      setAboutMode({ active: false });
      return [
        "Invalid option. Command cancelled.",
        "Type 'about' to try again.",
      ];
  }
};

// Mock API validation (replace with real API calls later)
const validateCountry = async (country) => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // Simulate API response
    }, 500);
  });
};

const createCommands = (
  weatherMode,
  setWeatherMode,
  aboutMode,
  setAboutMode,
  onNewLocation
) => ({
  help: () => [
    "Available commands:",
    "  help    - Show this help message",
    "  reset   - Reset application to initial state",
    "  about   - Learn more about Forecast",
    "  weather - Query weather for a location",
  ],
  weather: async () => {
    return handleWeatherCommand("", weatherMode, setWeatherMode, onNewLocation);
  },
  about: async () => {
    return handleAboutCommand("", aboutMode, setAboutMode);
  },
  reset: () => {
    window.location.reload();
    return ["Resetting application..."];
  },
});

export { createCommands, handleWeatherCommand, handleAboutCommand };
