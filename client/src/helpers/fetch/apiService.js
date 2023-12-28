import axios from 'axios';

const apiWeather = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_WEATHER}`,
});

const fetchDataWeather = async (endpoint) => {
  try {
    const response = await apiWeather.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

const apiGEOIP = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_GEOIPLOOKUP}?apiKey=${process.env.NEXT_PUBLIC_API_KEY_GEOIP}&ip=114.122.105.149`,
});

const fetchDataGEOIP = async (endpoint) => {
  try {
    const response = await apiGEOIP.get(endpoint);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export { fetchDataGEOIP, fetchDataWeather };
