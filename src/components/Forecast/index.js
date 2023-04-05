import React from 'react';
import ForecastCard from '../ForecastCard';

export default function Forecast() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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