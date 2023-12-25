'use client';
import React, { useEffect, useState } from 'react';

export default function Header() {
  const [currentTime, setCurrentTime] = useState('');
  const [fetchedTimezone, setFetchedTimezone] = useState('');

  useEffect(() => {
    const fetchTimezone = async () => {
      try {
        const response = await fetch(
          'https://api.ipgeolocation.io/ipgeo?apiKey=b4157b8346ff425897f0ccef5cde8bdd'
        ); // Replace with your Abstract API key
        const data = await response.json();
        const timezone = data?.time_zone?.name;
        console.log('User timezone:', timezone);
        setFetchedTimezone(timezone);
      } catch (error) {
        console.error('Error fetching timezone:', error);
      }
    };

    fetchTimezone();
  }, []);
  useEffect(() => {
    if (fetchedTimezone) {
      const ws = new WebSocket('ws://ws-clock.onrender.com'); // Replace with your WebSocket server URL

      ws.onmessage = (event) => {
        const receivedTime = parseInt(event.data); // Parse the received data as an integer (timestamp)
        const utcTime = new Date(receivedTime);
        if (!isNaN(utcTime)) {
          const userTime = utcTime.toLocaleTimeString(undefined, {
            timeZone: fetchedTimezone,
          });
          console.log(fetchedTimezone);
          setCurrentTime(userTime);
        } else {
          console.log('Invalid Date', receivedTime);
        }
      };

      return () => {
        ws.close();
      };
    }
  }, [fetchedTimezone]);
  console.log(currentTime);
  return (
    <header className='w-full h-full overflow-hidden'>
      <nav className='container mx-auto px-4 py-8'>
        <div className='brand_name '>
          <p className='text-2xl md:text-3xl font-medium text-textPrimary'>
            Weather App
          </p>
          <span className='text-textSecondary font-light text-sm'>
            {currentTime === '' ? 'loading' : currentTime}
          </span>
        </div>
      </nav>
    </header>
  );
}
