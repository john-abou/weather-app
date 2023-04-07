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
  console.log(sunny);
  return (
    <Card sx={{ maxWidth: 250 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="50"
          image={sunny}
          alt="weather forecast"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {/* Lizard  --- this should be the date */}

          </Typography>
          <Typography variant="body2" color="text.secondary">
            Lizards are a widespread group of squamate reptiles, with over 6,000
            species, ranging across all continents except Antarctica
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}