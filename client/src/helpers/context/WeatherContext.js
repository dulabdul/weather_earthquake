'use client';
import { createContext, useState, useEffect } from 'react';

const WeatherContextAPI = createContext();
const CityContextAPI = createContext();
const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [userProvince, setUserProvince] = useState(null);
  const [cityAPI, setCityAPI] = useState(null);
  useEffect(() => {
    // Fetch user's location information from IP geolocation API
    fetch(
      'https://api.ipgeolocation.io/ipgeo?apiKey=b4157b8346ff425897f0ccef5cde8bdd&ip=114.4.217.100'
    )
      .then((response) => response.json())
      .then((data) => {
        // Extract user's province information
        setCityAPI(data);
        const provinceWithoutSpaces = data.state_prov.replace(/\s+/g, ''); // Remove spaces
        setUserProvince(provinceWithoutSpaces);
      })
      .catch((error) => console.error(error));
  }, []);
  useEffect(() => {
    if (userProvince) {
      // Fetch data dari API saat komponen dimount
      fetch(
        `https://weather-api-tau-six.vercel.app/weather/${
          userProvince === 'JABODETABEK' ? 'dkijakarta' : userProvince
        }`
      )
        .then((response) => response.json())
        .then((data) => setWeatherData(data))
        .catch((error) => console.error(error));
    }
  }, [userProvince]);

  return (
    <CityContextAPI.Provider value={cityAPI}>
      <WeatherContextAPI.Provider value={weatherData}>
        {children}
      </WeatherContextAPI.Provider>
    </CityContextAPI.Provider>
  );
};

export { WeatherContextAPI, CityContextAPI, WeatherProvider };
