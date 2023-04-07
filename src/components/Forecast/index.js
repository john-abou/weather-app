import React from 'react';
import ForecastCard from '../ForecastCard';
import { useWeatherContext } from '../../contexts';

export default function Forecast() {
  const [state, dispatch] = useWeatherContext();
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getWeatherData = () => {
    
  }

  return (
    <div className='forecast'>
      <div className='forecast__container'>
        {days.map((day, index) => (
          <ForecastCard day={day} key={index} />
        ))}
      </div>
    </div>
  );
}