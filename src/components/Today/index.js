import React, {useEffect} from 'react';
import {useWeatherContext} from '../../contexts';
import {TODAYS_WEATHER} from '../../utils/actions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './style.css';
import sunny from '../../assets/images/icons/01d.png';
import night from '../../assets/images/icons/01n.png';
import sunCloudy from '../../assets/images/icons/02d.png';
import cloudSunny from '../../assets/images/icons/03d.png';
import cloudNight from '../../assets/images/icons/03n.png';
import cloudy from '../../assets/images/icons/04d.png';
import cloudy2 from '../../assets/images/icons/04n.png';
import rain from '../../assets/images/icons/09d.png';
import rain2 from '../../assets/images/icons/09n.png';
import rain3 from '../../assets/images/icons/10d.png';
import rain4 from '../../assets/images/icons/10n.png';
import storm from '../../assets/images/icons/11d.png';
import storm2 from '../../assets/images/icons/11n.png';
import snow from '../../assets/images/icons/13d.png';
import snow2 from '../../assets/images/icons/13n.png';
import windy from '../../assets/images/icons/50d.png';
import windy2 from '../../assets/images/icons/50n.png';

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
    const dateObject = new Date(milliseconds);
    let humanDateFormat = dateObject.toLocaleString();
    humanDateFormat = humanDateFormat.substring(0, humanDateFormat.length-18); // remove the hours, minutes, and seconds from the date

    return humanDateFormat;
  }

  const getIcon = () => {
    const icon = todaysWeather.weather[0].icon;
    switch (icon) {
      case '01d':
        return sunny;
      case '01n':
        return night;
      case '02d':
        return sunCloudy;
      case '02n':
        return sunCloudy;
      case '03d':
        return cloudSunny;
      case '03n':
        return cloudNight;
      case '04d':
        return cloudy;
      case '04n':
        return cloudy2;
      case '09d':
        return rain;
      case '09n':
        return rain2;
      case '10d':
        return rain3;
      case '10n':
        return rain4;
      case '11d':
        return storm;
      case '11n':
        return storm2;
      case '13d':
        return snow;
      case '13n':
        return snow2;
      case '50d':
        return windy;
      case '50n':
        return windy2;
      default:
        return sunny;
    }
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
              <Typography gutterBottom variant="h5" component="div">
                  {formatDate()}
              </Typography>
            </CardContent>
            <CardMedia
              component="img"
              height="160"
              image={sunny}
              alt="weather forecast"
            />
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
                {Math.floor(273.15) + '°C'}
              </Typography>
            </CardContent>
          </CardActionArea>
        </Card>        
      </div>
  );
}