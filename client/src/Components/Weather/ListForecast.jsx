'use client';
import {
  WeatherContextAPI,
  CityContextAPI,
} from '@/helpers/context/WeatherContext';
import FormatterDate from '@/helpers/formatDate';
import Image from 'next/image';
import React, { useContext, useState, useEffect } from 'react';
export default function ListForecast() {
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
    <div className='list_forecast w-full h-full overflow-hidden'>
      <div className='container mx-auto'>
        <div className='list_forecast-name'>
          {matches?.length > 0
            ? matches?.map((items, index) => {
                return items?.name?.slice(0, 1).map((names) => {
                  return (
                    <>
                      <h2
                        key={index}
                        className='text-textPrimary font-medium text-2xl md:text-3xl'>
                        {names} - {items.domain}
                      </h2>
                      {items?.parameter?.map((parameters) => {
                        return parameters?.description === 'Max temperature'
                          ? parameters?.timerange
                              ?.slice(0, 1)
                              .map((timeranges) => {
                                return (
                                  <>
                                    <span>
                                      <FormatterDate
                                        isWithHour={false}
                                        dateFormat={timeranges?.datetime}
                                      />
                                    </span>
                                    <div className='list_forecast-card px-4 py-2 bg-white rounded-lg flex border border-textPrimary'>
                                      <div className='list_forecast-card-max_temp flex items-center'>
                                        <Image
                                          src='/images/weather/temp.png'
                                          width={32}
                                          height={32}
                                          alt='Min Max Temperature'
                                        />
                                      </div>
                                    </div>
                                  </>
                                );
                              })
                          : '';
                      })}
                    </>
                  );
                });
              })
            : 'Tidak ada data'}
        </div>
      </div>
    </div>
  );
}
