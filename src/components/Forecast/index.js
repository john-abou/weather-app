import React, { useEffect } from 'react';
import ForecastCard from '../ForecastCard';
import { useWeatherContext } from '../../contexts';
import { FIVE_DAY_FORECAST } from '../../utils/actions';
import './style.css';

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
        fiveDayForecast: data.list
      });

    } else {
      console.log('Error: ' + response.statusText);
    }
  };

  useEffect(() => {
    if (geoCoordinates) {
      getCityForecast();
      console.log(state);
      console.log(state.fiveDayForecast);

    }
  }, [geoCoordinates]);

  return (
    <div className='forecast-container'>
      {(state.fiveDayForecast !== []) ? 
        state.fiveDayForecast.map((day, index) => (
        <ForecastCard day={day} key={index} />
      ))
      :
        <h1>Loading...</h1>
      }
    </div>
  );
}