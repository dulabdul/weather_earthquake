import React from 'react';
import Image from 'next/image';
export default function WeatherImage({ codeOfWeather }) {
  // inisiasi variabel untuk url image
  let imageUrl;
  let weatherOfName;
  switch (codeOfWeather) {
    // if weather code from api is equal to 0, then push url to imageUrl Val
    case '0':
      imageUrl = '/images/weather/sun.png';
      weatherOfName = 'Cerah/Clear Skies';
      break;
    // if weather code from api is equal to 1 or 2, then push url to imageUrl Val
    case '1':
    case '2':
      imageUrl = '/images/weather/partly_cloudy.png';
      weatherOfName = 'Cerah Berawan / Partly Cloudy';
      break;
    // if weather code from api is equal to 3, then push url to imageUrl Val
    case '3':
      imageUrl = '/images/weather/cloudy.png';
      weatherOfName = 'Berawan / Mostly Cloudy';
      break;
    // if weather code from api is equal to 60, then push url to imageUrl Val
    case '60':
      imageUrl = '/images/weather/rain.png';
      weatherOfName = 'Hujan Ringan / Light Rain';
      break;
    // if weather code from api is equal to 61, then push url to imageUrl Val
    case '61':
      imageUrl = '/images/weather/mid_rain.png';
      weatherOfName = 'Hujan Sedang / Rain';
      break;
    // if weather code from api is equal to 63, then push url to imageUrl Val
    case '63':
      imageUrl = '/images/weather/heavy_rain.png';
      weatherOfName = 'Hujan Lebat / Heavy Rain';
      break;
    // if weather code from api is equal to 95 or 97, then push url to imageUrl Val
    case '95':
    case '97':
      imageUrl = '/images/weather/severe_thunderstorm.png';
      weatherOfName = 'Hujan Petir / Severe Thunderstorm';
      break;
    default:
      break;
  }
  return (
    <Image
      quality={100}
      width={72}
      height={72}
      className='w-{72px} h-{72px}'
      src={imageUrl}
      alt={weatherOfName}
    />
  );
}
