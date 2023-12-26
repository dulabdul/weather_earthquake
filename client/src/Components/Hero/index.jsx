import React from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
export default function Hero() {
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
              <div className='flex flex-col items-start px-4 py-2 rounded-lg bg-black/25'>
                <div className='weather_card-region'>
                  <p className='text-white text-lg font-light'>Quezon City</p>
                  <p className='text-white text-sm font-light'>Flipina</p>
                </div>
                <div className='weather_card-info flex flex-row items-center gap-x-4'>
                  <img
                    src='/images/cloud_rain.png'
                    alt='Awan Hujan'
                  />
                  <p className='text3xl md:text-5xl text-white'>28°c</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
