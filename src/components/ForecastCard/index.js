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


export default function ForecastCard( { day } ) {
  const getIcon = () => {
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
  const formatDate = () => {
    const milliseconds = day.dt * 1000;
    const dateObject = new Date(milliseconds);
    let humanDateFormat = dateObject.toLocaleString();
    humanDateFormat = humanDateFormat.substring(0, humanDateFormat.length-18); // remove the hours, minutes, and seconds from the date

    return humanDateFormat;
  }

  return (
    <Card sx={{ 
      maxWidth: 50,
      height: 150,
      display: 'inline-block',
      margin: 1
      }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="50"
          image={sunny}
          alt="weather forecast"
        />
        <CardContent>
          <Typography 
          gutterBottom 
          variant="h6" 
          component="div">
            {formatDate()}
          </Typography>
          <Typography 
          variant="body2" 
          color="text.secondary">
            {}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}