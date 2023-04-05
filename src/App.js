import React from 'react';
// Import components from the components folder
import Navbar from './components/Navbar';
import Main from './components/Main';
import Forecast from './components/Forecast';

export default function App() {
  return (
    <div className='App'>
      <Navbar />
      <Main />
      <Forecast />
    </div>
  );
}