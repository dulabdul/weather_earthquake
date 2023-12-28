import React from 'react';

function LoadingClockHeader() {
  return (
    <div className='w-24 h-3 bg-slate-300 rounded-full transition-all duration-500 animate-pulse'></div>
  );
}

function LoadingWeatherHero() {
  return (
    <div className='w-72 h-36 rounded-lg px-4 flex flex-col items-start bg-black/20 transition-all duration-500 animate-pulse'>
      <div className='w-32 h-3 rounded-lg my-4  bg-black/30 transition-all duration-500 animate-pulse'></div>
      <div className='w-24 h-3 rounded-lg  bg-black/30 transition-all duration-500 animate-pulse'></div>
    </div>
  );
}

export { LoadingClockHeader, LoadingWeatherHero };
