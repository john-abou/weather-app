import * as React from 'react';
import Icon from '../Icon';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useMediaQuery } from '@mui/material';
import './style.css';


export default function ForecastCard( { day } ) {
  const isMediumScreen = useMediaQuery('(max-height:895px)');

  const formatDate = () => {
    const timestamp = new Date(day.dt_txt);
    const month =  timestamp.getMonth() + 1;
    const dayOfMonth =  timestamp.getDate();
    const formattedDate = `${month.toString().padStart(2, '0')}/${dayOfMonth.toString().padStart(2, '0')}`;
    return formattedDate;
  }
  const formatTime = () => {
    const timestamp = new Date(day.dt_txt);
    const hours = timestamp.getHours();
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
        <Icon icon={day.weather[0].icon} height='50px' width='50px'/>
        <CardContent sx = {{padding: '0',marginBottom: '-24px'}}>
          <Typography
            gutterBottom
            variant="body1"
            fontSize={isMediumScreen ? '.8rem' : "1rem"}
            fontWeight={isMediumScreen ? '300' : "400"}
            margin="0"
            >
            {formatTime()}
          </Typography>
          <Typography 
            gutterBottom 
            variant="body1" 
            fontSize={isMediumScreen ? '.7rem' : ".75rem"}
            fontWeight={isMediumScreen ? '200' : "300"}
            >
            {formatDate()}
          </Typography>
          <Typography 
            variant="body1"
            fontSize={isMediumScreen ? '.8rem' : '.9rem'}
            fontWeight={isMediumScreen ? '400' : "500"}
            >
            {(day.main===undefined) ? Math.floor(273.15) + '°C' : Math.floor(day?.main?.temp - 273.15) + '°C'}
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
}