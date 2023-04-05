import React from 'react';

export default function ForecastCard({ day }) {
  return (
    <div className='forecast-card'>
      <div className='forecast-card__container'>
        <h2>{day}</h2>
        <p>Cloudy</p>
        <h3>20&deg;</h3>
      </div>
    </div>
  );
}