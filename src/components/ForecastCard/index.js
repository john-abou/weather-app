import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
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
import './style.css';


export default function ForecastCard( { day } ) {
  const getIcon = () => {
    if (day.weather === undefined) {
      return sunny;
    } else {
      const icon = day.weather[0].icon;
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
  }
  const formatDate = () => {
    const month =  day.dt_txt.getMonth() + 1;
    const dayOfMonth =  day.dt_txt.getDate();
    const formattedDate = `${month.toString().padStart(2, '0')}/${dayOfMonth.toString().padStart(2, '0')}`;
    return formattedDate;
  }
  const formatTime = () => {
    const hours = day.dt_txt.getHours();
    const amOrPm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12;
    const formattedTime = `${formattedHours} ${amOrPm}`    
    return formattedTime;
  }
  

  return (
    <div className="forecast-card">
      <Card sx={{width: '70px'}}>
        <CardActionArea >
          <CardMedia
            component="img"
            height="65"
            image={getIcon()}
            alt="weather forecast"
          />
          <CardContent sx = {{padding: '1rem .2rem .5rem'}}>
            <Typography
              gutterBottom
              variant="body1"
              component="div"
              fontSize="1rem"
              margin="0"
              >
              {formatTime()}
            </Typography>
            <Typography 
              gutterBottom 
              variant="body1" 
              component="div"
              fontSize=".75rem"
              color='text.secondary'
              >
              {formatDate()}
            </Typography>
            <Typography 
              variant="body1"
              fontSize='.9rem'
              color="text.secondary">
              {(day.main===undefined) ? Math.floor(273.15) + '°C' : Math.floor(day?.main?.temp - 273.15) + '°C'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}