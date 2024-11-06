// Commands.jsx

// Mock API validation (replace with real API calls later)
const validateCountry = async (country) => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // Simulate API response
    }, 500);
  });
};

const validateCity = async (city, country) => {
  // TODO: Replace with actual API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // Simulate API response
    }, 500);
  });
};

const properCapitalize = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Weather command handler
const handleWeatherCommand = async (input, weatherMode, setWeatherMode) => {
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
        country: properInput, // Store the properly capitalized country name
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
    const isValidCity = await validateCity(
      input.toLowerCase(),
      weatherMode.country.toLowerCase()
    );
    if (isValidCity) {
      setWeatherMode({ active: false, step: null, country: null });
      return [
        `Fetching weather for ${properInput}, ${weatherMode.country}...`,
        "Weather data will be displayed here",
        // TODO: Add actual weather data display
      ];
    } else {
      setWeatherMode({ active: false, step: null, country: null });
      return [
        `Invalid city: ${properInput}`,
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

const createCommands = (
  weatherMode,
  setWeatherMode,
  aboutMode,
  setAboutMode
) => ({
  help: () => [
    "Available commands:",
    "  help    - Show this help message",
    "  reset   - Reset application to initial state",
    "  about   - Learn more about Forecast",
    "  weather - Query weather for a location",
  ],
  weather: async () => {
    return handleWeatherCommand("", weatherMode, setWeatherMode);
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
