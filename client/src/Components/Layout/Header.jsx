'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { LoadingClockHeader } from '../Loading';
export default function Header() {
  const [currentTime, setCurrentTime] = useState('');
  const [fetchedTimezone, setFetchedTimezone] = useState('');

  useEffect(() => {
    const fetchTimezone = async () => {
      try {
        const response = await fetch(
          'https://api.ipgeolocation.io/ipgeo?apiKey=b4157b8346ff425897f0ccef5cde8bdd&fields=time_zone'
        );
        const data = await response.json();
        const timezone = data?.time_zone?.name;

        setFetchedTimezone(timezone);
      } catch (error) {
        console.error('Error fetching timezone:', error);
      }
    };

    fetchTimezone();
  }, []);
  useEffect(() => {
    if (fetchedTimezone) {
      const ws = new WebSocket(`${process.env.NEXT_PUBLIC_WS_CLOCK}`); // Replace with your WebSocket server URL

      ws.onmessage = (event) => {
        const receivedTime = parseInt(event.data); // Parse the received data as an integer (timestamp)
        const utcTime = new Date(receivedTime);
        if (!isNaN(utcTime)) {
          const userTime = utcTime.toLocaleTimeString(undefined, {
            timeZone: fetchedTimezone,
          });

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
  return (
    <header className='w-full h-full overflow-hidden'>
      <nav className='container flex justify-between mx-auto px-4 py-8'>
        <div className='brand_name '>
          <p className='text-2xl md:text-3xl font-medium text-textPrimary'>
            Weather App
          </p>
          <span className='text-textSecondary font-light text-sm'>
            {currentTime === '' ? <LoadingClockHeader /> : currentTime}
          </span>
        </div>
        <div className='flex items-center'>
          <ul className='flex flex-row items-center gap-x-4'>
            <li className='text-primary hover:text-greenColor'>
              <Link href='/'>Home</Link>
            </li>
            <li className='text-primary hover:text-greenColor'>
              <Link href='/info-gempa'>Info Gempa</Link>
            </li>
            <li className='text-primary hover:text-greenColor'>
              <Link href='/contact'>Contact</Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
