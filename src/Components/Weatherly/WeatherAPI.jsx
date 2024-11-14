import axios from "axios";

// Function to get coordinates for a city and country with state information
export const getCoordinates = async (city, country) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: `${city},${country}`,
          limit: 5,
          appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
        },
      }
    );

    if (response.data && response.data.length > 0) {
      return response.data.map((location) => ({
        name: location.name,
        state: location.state || "", // Includes state if available
        country: location.country,
        lat: location.lat,
        lon: location.lon,
        valid: true,
      }));
    } else {
      return []; // No locations found
    }
  } catch (error) {
    console.error("Error fetching coordinates:", error);
    return [];
  }
};

// Function to get current weather data for a given latitude and longitude
export const getCurrentWeather = async (lat, lon) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          lat,
          lon,
          units: "metric",
          appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
        },
      }
    );

    const data = response.data;
    return {
      temp: {
        celsius: data.main.temp,
        fahrenheit: (data.main.temp * 9) / 5 + 32,
      },
      feels_like: {
        celsius: data.main.feels_like,
        fahrenheit: (data.main.feels_like * 9) / 5 + 32,
      },
      humidity: data.main.humidity,
      wind_speed: data.wind.speed,
      description: data.weather[0].description,
      time: new Date(data.dt * 1000).toLocaleTimeString(),
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    return null;
  }
};

// Function to validate if a given country name is valid using OpenWeather city list data
export const validateCountry = async (country) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather`,
      {
        params: {
          q: country,
          appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
        },
      }
    );

    // Check if any data is returned for the country name
    return response.data && response.data.sys && response.data.sys.country
      ? true
      : false;
  } catch (error) {
    console.error("Error validating country:", error);
    return false;
  }
};
