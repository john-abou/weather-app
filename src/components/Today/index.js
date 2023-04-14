import React, {useEffect} from 'react';
import {useWeatherContext} from '../../contexts';
import {TODAYS_WEATHER, SET_TIMEZONE} from '../../utils/actions';
import Icon from '../Icon';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { timezoneMap } from '../../utils/helpers';
import './style.css';

export default function Today() {
  const [state, dispatch] = useWeatherContext();
  const { geoCoordinates, todaysWeather, currentCity, timezone } = state;

  const formatTimeData = ( data ) => {
    // Conver the unix UTC time to the local time of the city using the unix timezone offset
    const milliseconds = data.dt * 1000;
    const offset = data.timezone * 1000;
    const timezoneString = timezoneMap[data.timezone.toString()];
    const dateObject = new Date(milliseconds);

    // Format the time to be displayed as a timestamp in the format of 'Fri Apr 14 2023 02:00:00 GMT-0400 (Eastern Daylight Time)'
    const formattedTime = dateObject.toString().split(' ').slice(0, 5).join(' ') + ' ' + timezoneString;

    // Update the data.dt with the new formatted time
    data.dt = formattedTime;
    
    // Update the state with the current city's timezone
    dispatch({
      type: SET_TIMEZONE,
      timezone: timezoneString
    });

    return data;
  }

  const formatDate = () => {
    // Format the date to be displayed as a timestamp in the format of 'MM/DD'
    const formattedDate = todaysWeather.dt ? todaysWeather.dt.split(' ').slice(1, 3).join(' ') : '00/00';
    return formattedDate;
  }

  const getCityForecast = async () => {
    const queryString = 'https://api.openweathermap.org/data/2.5/weather?lat=' + geoCoordinates.lat + '&lon=' + geoCoordinates.lon + '&appid=5d82752b5eec77e02284baee59150776';
    const response = await fetch(queryString);
    if (response.ok) {
      let data = await response.json();
      data = formatTimeData(data);
      console.log('Todays Data:')
      console.log(data);

      // Update the state with the current city's forecast
      dispatch({
        type: TODAYS_WEATHER,
        todaysWeather: data
      });

    } else {
      console.log('Error: ' + response.statusText);
    }
  };

  useEffect(() => {
    if (geoCoordinates) {
      getCityForecast();
    }
  }, [geoCoordinates]);

  const formatTemp = (temp) => {
    return Math.floor(temp - 273.15) + '°C';
  }

  return (
      <div className='main-container'>
        <Card sx={{
          width: '90%',
          backgroundColor: 'rgba(40, 86, 163, 0.3)',
          borderRadius: '1em',
          color: 'white'
          }}>
          <CardActionArea>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                paddingBottom: '0'
              }}
            > 
            <Typography 
              sx={{fontSize: '1.2em', display: 'flex', flexDirection: 'column', lineHeight: '1.1em', alignItems: 'center'}}
              gutterBottom 
              variant="h6" 
              component="div">
                  {formatDate()}
            </Typography>
            <Typography 
                variant="body1" 
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  fontSize: '4em',
                  lineHeight: '1.3em'
                }}
              >
                {(todaysWeather.main===undefined) ? Math.floor(273.15) + '°C' : formatTemp(todaysWeather?.main?.temp)}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  fontSize: '1.2em',
                  lineHeight: '1.1em'
                }}
              >
                {todaysWeather.weather ? todaysWeather.weather[0].description : 'No Data'}
              </Typography>
                <div className='today-low-high'>
                  <p>
                  {(todaysWeather.main===undefined) ? Math.floor(273.15) + '°C' : 'Low: ' + formatTemp(todaysWeather?.main?.temp_min)}
                  </p>
                  <p>
                  {(todaysWeather.main===undefined) ? Math.floor(273.15) + '°C' : 'High: ' + formatTemp(todaysWeather?.main?.temp_max)}
                  </p>
                </div>
            </CardContent>
            <Icon icon={todaysWeather.weather ? todaysWeather.weather[0].icon : '01d'} height='160px' width='175px' />
            <CardContent sx={{paddingTop: '0'}}>
            <div className='title-container'>
              <p className='title'>{currentCity}</p>
              <p className='timezone'>{timezone}</p>
            </div>
            </CardContent>
          </CardActionArea>
        </Card>        
      </div>
  );
}