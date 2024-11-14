import axios from "axios";

// Helper function to calculate the distance between two coordinates (in kilometers)
const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
};

// Helper function to filter out nearby or duplicate locations within a distance threshold
const filterUniqueLocations = (locations, threshold = 10) => {
  const uniqueLocations = [];

  locations.forEach((location) => {
    const isDuplicate = uniqueLocations.some((uniqueLocation) => {
      const distance = calculateDistance(
        location.lat,
        location.lon,
        uniqueLocation.lat,
        uniqueLocation.lon
      );
      return distance < threshold; // Check if within threshold
    });

    if (!isDuplicate) {
      uniqueLocations.push(location);
    }
  });

  return uniqueLocations;
};

// Function to get coordinates for a city and country with specified ISO code
export const getCoordinates = async (city, countryCode) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct`,
      {
        params: {
          q: `${city},${countryCode}`,
          limit: 5,
          appid: process.env.REACT_APP_OPENWEATHER_API_KEY,
        },
      }
    );

    console.log("getCoordinates response (before filtering):", response.data);

    if (response.data && response.data.length > 0) {
      const filteredResults = filterUniqueLocations(response.data);

      console.log(
        "getCoordinates response (after filtering):",
        filteredResults
      );

      return filteredResults.map((location) => ({
        name: location.name,
        state: location.country === "US" ? location.state || "" : "", // Only include state for U.S. locations
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
