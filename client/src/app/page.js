import Hero from '@/Components/Hero';
import { WeatherProvider } from '@/helpers/context/WeatherContext';
import Image from 'next/image';

export default function Home() {
  return (
    <WeatherProvider>
      <Hero />
    </WeatherProvider>
  );
}
