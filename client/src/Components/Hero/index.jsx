'use client';
import {
  WeatherContextAPI,
  CityContextAPI,
} from '@/helpers/context/WeatherContext';
import React, { useContext, useState, useEffect } from 'react';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import WeatherImage from '@/helpers/weatherImage';
import { LoadingWeatherHero } from '../Loading';
export default function Hero() {
  const data = useContext(WeatherContextAPI);
  const dataCity = useContext(CityContextAPI);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setForecastWeather(data?.data?.forecast?.area);
    // filter for matching description name at forecast and city at geoip
    setMatches(
      forecastWeather?.filter((item) => item.description === dataCity?.city)
    );
    if (data && dataCity) {
      setIsLoading(true);
    }
  }, [data, forecastWeather]);

  return (
    <div className='w-full h-full py-12 md:px-4'>
      <div className='container mx-auto'>
        <div className='md:rounded-2xl flex justify-center items-center bg-[url("/images/hero_bg_light.jpg")] w-full h-[70vh] bg-cover bg-no-repeat bg-center'>
          <div className='absolute'>
            <div className='bg-white  justify-center rounded-lg px-4 py-2 flex items-center flex-row'>
              <label className='flex items-center gap-x-3'>
                <FaMagnifyingGlass className='text-2xl text-textPrimary' />
                <input
                  className='placeholder:text-slate-300 focus:text-textPrimary border-slate-300 focus:rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:border-greenColor focus:ring-greenColor px-4 py-1'
                  type='text'
                  name='searchName'
                  placeholder='Cari provinsi atau kota'
                />
              </label>
            </div>
            <div className='weather_card flex flex-col py-3'>
              <p className='text-white font-semibold text-base'>
                Lokasi Terbaru
              </p>
              {!isLoading ? (
                <LoadingWeatherHero />
              ) : matches?.length > 0 ? (
                matches?.map((items, index) => {
                  return (
                    <div
                      key={index}
                      className='flex flex-col items-start px-4 py-2 gap-y-4 rounded-lg bg-black/25'>
                      <div className='weather_card-region'>
                        <p className='text-white text-lg font-light'>
                          {items.description}
                        </p>
                        <p className='text-white text-sm font-light'>
                          {items.domain}
                        </p>
                      </div>
                      <div className='weather_card-info flex flex-row items-center gap-x-4'>
                        {items.parameter.map((parameters, index) => {
                          return parameters.description === 'Weather'
                            ? parameters.timerange
                                .slice(0, 1)
                                .map((timeranges) => {
                                  return timeranges?.value
                                    .slice(0, 1)
                                    .map((values) => {
                                      return (
                                        <WeatherImage
                                          key={index}
                                          codeOfWeather={values.text}
                                        />
                                      );
                                    });
                                })
                            : '';
                        })}
                        {items.parameter.map((parameters, index) => {
                          return parameters?.description === 'Max temperature'
                            ? parameters.timerange
                                .slice(0, 1)
                                .map((timeranges, index) => {
                                  return timeranges?.value
                                    .slice(0, 1)
                                    .map((values) => {
                                      return (
                                        <p
                                          key={index}
                                          className='text3xl md:text-4xl text-white'>
                                          {`${values.text}°${values.unit}`}
                                        </p>
                                      );
                                    });
                                })
                            : '';
                        })}
                      </div>
                    </div>
                  );
                })
              ) : (
                forecastWeather?.slice(0, 1).map((forecasts, index) => {
                  return (
                    <div
                      key={index}
                      className='flex flex-col items-start px-4 py-2 gap-y-4 rounded-lg bg-black/25'>
                      <div className='weather_card-region'>
                        <p className='text-white text-lg font-light'>
                          {forecasts.description}
                        </p>
                        <p className='text-white text-sm font-light'>
                          {forecasts.domain}
                        </p>
                      </div>
                      <div className='weather_card-info flex flex-row items-center gap-x-4'>
                        {forecasts.parameter.map((parameters, index) => {
                          return parameters.description === 'Weather'
                            ? parameters.timerange
                                .slice(0, 1)
                                .map((timeranges) => {
                                  return timeranges?.value
                                    .slice(0, 1)
                                    .map((values) => {
                                      return (
                                        <WeatherImage
                                          key={index}
                                          codeOfWeather={values.text}
                                        />
                                      );
                                    });
                                })
                            : '';
                        })}
                        {forecasts.parameter.map((parameters, index) => {
                          return parameters?.description === 'Max temperature'
                            ? parameters.timerange
                                .slice(0, 1)
                                .map((timeranges) => {
                                  return timeranges?.value
                                    .slice(0, 1)
                                    .map((values) => {
                                      return (
                                        <p
                                          key={index}
                                          className='text3xl md:text-4xl text-white'>
                                          {`${values.text}°${values.unit}`}
                                        </p>
                                      );
                                    });
                                })
                            : '';
                        })}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
