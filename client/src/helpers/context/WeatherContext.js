'use client';
import { createContext, useState, useEffect } from 'react';
import { fetchDataGEOIP, fetchDataWeather } from '../fetch/apiService';
const WeatherContextAPI = createContext();
const CityContextAPI = createContext();
const WeatherProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [userProvince, setUserProvince] = useState(null);
  const [cityAPI, setCityAPI] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // handle province not found in weather api
  let provinceAPI;
  switch (userProvince) {
    case 'JABODETABEK':
      provinceAPI = 'dkijakarta';
      break;
    case 'BandungRaya':
      provinceAPI = 'jawabarat';
      break;
    default:
      break;
  }
  useEffect(() => {
    const fetchAPIData = async () => {
      setLoading(true);
      try {
        const result = await fetchDataGEOIP();
        setCityAPI(result);
        const provinceWithoutSpaces = result.state_prov.replace(/\s+/g, ''); // Remove spaces
        setUserProvince(provinceWithoutSpaces);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchAPIData();
  }, []);
  useEffect(() => {
    if (userProvince) {
      // Fetch data dari API saat komponen dimount
      const fetchAPIWeatherData = async () => {
        setLoading(true);
        try {
          const result = await fetchDataWeather(`/weather/${provinceAPI}`);

          setWeatherData(result);
        } catch (error) {
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      fetchAPIWeatherData();
    }
  }, [userProvince]);
  console.log(weatherData);
  return (
    <CityContextAPI.Provider value={cityAPI}>
      <WeatherContextAPI.Provider value={weatherData}>
        {children}
      </WeatherContextAPI.Provider>
    </CityContextAPI.Provider>
  );
};

export { WeatherContextAPI, CityContextAPI, WeatherProvider };
