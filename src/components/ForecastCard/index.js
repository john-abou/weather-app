import * as React from 'react';
import Icon from '../Icon';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import './style.css';


export default function ForecastCard( { day } ) {
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
      <Card 
      sx={{
        width: '100px',
        backgroundColor: 'rgba(135, 206, 235, 0)',
        boxShadow: 'none',
        borderRadius: '0',
        padding: '0',
        color: 'white'
      }}
      >
        <CardActionArea >
          <Icon icon={day.weather[0].icon} height='60px' width='60px'/>
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
              >
              {formatDate()}
            </Typography>
            <Typography 
              variant="body1"
              fontSize='.9rem'
              >
              {(day.main===undefined) ? Math.floor(273.15) + '°C' : Math.floor(day?.main?.temp - 273.15) + '°C'}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </div>
  );
}