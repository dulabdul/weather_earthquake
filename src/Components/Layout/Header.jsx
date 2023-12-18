'use client';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
export default function Header() {
  const [currentTime, setCurrentTime] = useState('');
  useEffect(() => {
    const socket = io('http://localhost:4000'); // Replace with your server URL

    socket.on('time', ({ time }) => {
      setCurrentTime(time);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // Convert timestamp to human-readable format
  const formattedTime = new Date(currentTime).toLocaleTimeString();

  console.log(currentTime);
  return (
    <header className='w-full h-full overflow-hidden'>
      <nav className='container mx-auto px-4 py-8'>
        <div className='brand_name '>
          <p className='text-2xl md:text-3xl font-medium text-textPrimary'>
            Weather App
          </p>
          <span className='text-textSecondary font-light text-sm'>
            {currentTime}
          </span>
        </div>
      </nav>
    </header>
  );
}
