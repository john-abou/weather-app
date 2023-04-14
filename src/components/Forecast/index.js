import React, { useEffect } from 'react';
import ForecastCard from '../ForecastCard';
import { useWeatherContext } from '../../contexts';
import { FIVE_DAY_FORECAST } from '../../utils/actions';
import { timezoneMap } from '../../utils/helpers';
import './style.css';

export default function Forecast() {
  const [state, dispatch] = useWeatherContext();
  const { geoCoordinates } = state;

  const formatTimeData = (data) => {
    // Conver the unix UTC time to the local time of the city using the unix timezone offset
    for (let i=0; i < data.list.length; i++) {
      console.log('data.city.timezone: ' + data.city.timezone);
      const time = data.list[i];
      const milliseconds = time.dt * 1000;
      // const offset = data.city.timezone * 1000;
      const timezoneString = timezoneMap[data.city.timezone.toString()];
      const dateObject = new Date(milliseconds);

      // Format the time to be displayed as a timestamp in the format of 'Fri Apr 14 2023 02:00:00 GMT-0400 (Eastern Daylight Time)'
      const formattedTime = dateObject.toString().split(' ').slice(0, 5).join(' ') + ' ' + timezoneString;

      // Update the data.dt with the new formatted time
      time.dt = formattedTime;
    }

    return data;
  }


  const getCityForecast = async () => {
    let queryString = "https://api.openweathermap.org/data/2.5/forecast?lat=" + geoCoordinates.lat + "&lon=" + geoCoordinates.lon + "&appid=5d82752b5eec77e02284baee59150776";
    const response = await fetch(queryString);
    if (response.ok) {
      let data = await response.json();
      // Convert the UTC time to EST time
      for (let i = 0; i < data.list.length; i++) {
        let date = new Date(data.list[i].dt_txt);
        date.setHours(date.getHours() - 4);
        data.list[i].dt_txt = date;
      }
      console.log('Forecast Data:')
      console.log(data);

      data = formatTimeData(data);

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

  // const detailedForecast = state.fiveDayForecast.splice(0, 16);
  const twoDayForecast = state.fiveDayForecast.slice(0, 16);

  return (
    <div className='forecast-container'>
      {(state.fiveDayForecast !== []) ? 
        twoDayForecast.map((day, index) => (
        <ForecastCard day={day} key={index} />
      ))
      :
        <h1>Loading...</h1>
      }
    </div>
  );
}