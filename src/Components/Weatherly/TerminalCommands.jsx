import { getCoordinates, getCurrentWeather } from "./WeatherAPI";

// Function to properly capitalize input
const properCapitalize = (str) => {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Mock validation - replace with real API later
const validateCountry = async (country) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true); // Mock response
    }, 500);
  });
};

export const handleWeatherCommand = async (
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

      if (onNewLocation) {
        onNewLocation(
          locationData.lat,
          locationData.lon,
          locationData.name,
          locationData.country
        );
      }

      return [
        `Weather for ${properInput}, ${weatherMode.country}:`,
        `Temperature: ${weather.temp.celsius}°C / ${weather.temp.fahrenheit}°F`,
        `Feels like: ${weather.feels_like.celsius}°C / ${weather.feels_like.fahrenheit}°F`,
        `Humidity: ${weather.humidity}%`,
        `Wind Speed: ${weather.wind_speed} m/s`,
        `Conditions: ${weather.description}`,
        `Local Time: ${weather.time}`,
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

export const handleAboutCommand = async (input, aboutMode, setAboutMode) => {
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
        "• Built with CesiumJS and Resium",
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

export const createCommands = (
  weatherMode,
  setWeatherMode,
  aboutMode,
  setAboutMode,
  onNewLocation
) => ({
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
  clear: () => {
    return ["Terminal cleared"];
  },
  help: () => [
    "Available commands:",
    "  weather - Query weather for a location",
    "  about   - Learn more about Forecast",
    "  reset   - Reset application to initial state",
    "  clear   - Clear terminal history",
  ],
});
