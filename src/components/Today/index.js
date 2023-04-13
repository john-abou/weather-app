import React, {useEffect} from 'react';
import {useWeatherContext} from '../../contexts';
import {TODAYS_WEATHER} from '../../utils/actions';
import Icon from '../Icon';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './style.css';

export default function Today() {
  const [state, dispatch] = useWeatherContext();
  const { geoCoordinates, todaysWeather } = state;

  const getCityForecast = async () => {
    const queryString = 'https://api.openweathermap.org/data/2.5/weather?lat=' + geoCoordinates.lat + '&lon=' + geoCoordinates.lon + '&appid=5d82752b5eec77e02284baee59150776';
    const response = await fetch(queryString);
    if (response.ok) {
      const data = await response.json();
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

  const formatDate = () => {
    const milliseconds = todaysWeather.dt * 1000;
    const dateObject = new Date(milliseconds - 5 * 60 * 60 * 1000);
    const month = dateObject.getMonth() + 1;
    const dayOfMonth = dateObject.getDate();
    const formattedDate = `${month.toString().padStart(2, '0')}/${dayOfMonth.toString().padStart(2, '0')}`;
    return formattedDate;
  }

  return (
      <div className='main-container'>
        <Card sx={{
          maxWidth: 500
          }}>
          <CardActionArea>
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}
            >
              <Typography 
              gutterBottom 
              variant="h6" 
              component="div">
                  {formatDate()}
              </Typography>
            </CardContent>
            <Icon icon={todaysWeather.weather ? todaysWeather.weather[0].icon : '01d'} height='160px' />
            <CardContent>
              <Typography 
                variant="body1" 
                color="text.secondary"
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center'
                }}
              >
                {(todaysWeather.main===undefined) ? Math.floor(273.15) + '°C' : Math.floor(todaysWeather?.main?.temp - 273.15) + '°C'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>        
      </div>
  );
}