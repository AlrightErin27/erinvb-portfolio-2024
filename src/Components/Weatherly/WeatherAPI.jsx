const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;
if (!API_KEY) {
  console.error(
    "OpenWeather API key is missing. Please check your environment variables."
  );
}

const BASE_URL = "http://api.openweathermap.org/data/2.5";
const GEO_URL = "http://api.openweathermap.org/geo/1.0";

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

export { getCoordinates, getCurrentWeather };
