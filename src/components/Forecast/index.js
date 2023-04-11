import React, { useEffect } from 'react';
import ForecastCard from '../ForecastCard';
import { useWeatherContext } from '../../contexts';
import { FIVE_DAY_FORECAST } from '../../utils/actions';

export default function Forecast() {
  const [state, dispatch] = useWeatherContext();
  const { geoCoordinates } = state;

  const getCityForecast = async () => {
    let queryString = "https://api.openweathermap.org/data/2.5/forecast?lat=" + geoCoordinates.lat + "&lon=" + geoCoordinates.lon + "&appid=5d82752b5eec77e02284baee59150776";
    const response = await fetch(queryString);
    if (response.ok) {
      const data = await response.json();
      console.log('Forecast Data below:')
      console.log(data);

      // Update the state with the current city's forecast
      dispatch({
        type: FIVE_DAY_FORECAST,
        cityForecast: data.list
      });

    } else {
      console.log('Error: ' + response.statusText);
    }
  };

  useEffect(() => {
    if (geoCoordinates) {
      getCityForecast();
      console.log(state);
    }
  }, [geoCoordinates]);

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