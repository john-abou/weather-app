import React from 'react';
// Import components from the components folder
import Navbar from './components/Navbar';
import Today from './components/Today';
import Forecast from './components/Forecast';
// Import the WeatherProvider from the contexts folder
import { WeatherProvider } from './contexts';

export default function App() {
  return (
    <WeatherProvider>
      <div className='App'>
        <Navbar />
        <Today />
        <Forecast />
      </div>
    </WeatherProvider>
  );
}