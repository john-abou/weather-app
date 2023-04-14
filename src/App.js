import React from 'react';
// Import components from the components folder
import Navbar from './components/Navbar';
import Today from './components/Today';
import Forecast from './components/Forecast';
import Table from './components/Table';
// Import the WeatherProvider from the contexts folder
import { WeatherProvider } from './contexts';
import './assets/css/style.css'

export default function App() {
  return (
    <WeatherProvider>
      <div className='App'>
        <Navbar />
        <Today />
        <Forecast />
        <Table />
      </div>
    </WeatherProvider>
  );
}