import axios from "axios";
const baseUrl = "https://studies.cs.helsinki.fi/restcountries";

const getAllCountries = () => {
  const request = axios.get(baseUrl + "/api/all");
  return request.then((response) => response.data);
};

const searchByCountryFullName = (name) => {
  const request = axios.get(`${baseUrl}/api/name/${name}`);
  return request.then((response) => response.data);
};

const getCurrentWeatherByCoordinates = (lat, lon) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${
      import.meta.env.VITE_OPEN_WEATHER_MAP_API_KEY
    }`
  );
  return request.then((response) => response.data);
};

export default {
  getAllCountries,
  searchByCountryFullName,
  getCurrentWeatherByCoordinates,
};
