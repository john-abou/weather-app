import React from 'react';
import { CardMedia } from '@mui/material';
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
import { useWeatherContext } from '../../contexts';

export default function Icon ( {icon, height, width} ) {
  const [state, dispatch] = useWeatherContext();
  const {fiveDayForecast, summarizedFiveDayForecast, todaysWeather} = state;

  const getIcon = () => {
    if (fiveDayForecast !== undefined || summarizedFiveDayForecast !== undefined || todaysWeather !== undefined) { 
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
  };

  return (
    <CardMedia
        sx={{ width: width}}
        component="img"
        height={height}
        image={getIcon()}
        alt="weather icon"
      />
  );
}