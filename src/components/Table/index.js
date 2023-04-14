import React, {useEffect} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useWeatherContext } from '../../contexts';
import Icon from '../Icon';
import './style.css';


export default function DenseTable() {
  const [state, dispatch] = useWeatherContext();
  const { fiveDayForecast, summarizedFiveDayForecast } = state;

  const summarizedData = [];

  // create a function to summarize the fiveDayForecast data and return an array of objects. One object for each day.
  // Each object should contain the date, the temperature at midday - 12PM and the min/max temperatures expecgted throughout the day, the humidity, and the wind speed.
  const summarizeForecast = () => {
    if (fiveDayForecast.length > 0) {
      // Create an array to store the summarized data and arrays to hold data for each day. 
      const day1 = [];
      const day2 = [];
      const day3 = [];
      const day4 = [];
      const day5 = [];

      // Loop through the fiveDayForecast array and push each item into the appropriate day array.
      fiveDayForecast.forEach((item) => {
        const date = new Date(item.dt_txt);
        const today = new Date();
        // find the difference between the number of days of the current day and the day of the forecast
        const difference = date.getDate() - today.getDate();
        // Have a switch statement to specifify which array to push the item into based on the difference.
        switch (difference) {
          case 0:
            day1.push(item);
            break;
          case 1:
            day2.push(item);
            break;
          case 2:
            day3.push(item);
            break;
          case 3:
            day4.push(item);
            break;
          case 4:
            day5.push(item);
            break;
          default:
            break;
        }
      });

      // For each day, summarize the data. This should contain data from midday (b/w 1-3PM) for the temp, humidity, and wind speed. It should also contain the min/max temp for the day.
      const day1Summary = day1.filter((item) => {
        let dateText = item.dt_txt.toString();
        const currentTime = new Date().getHours();
        const endGoalTime = currentTime + 3;
        // if the current time is greater than 12, then we need to filter the data to only include the next 3 hours.
        if (currentTime >= 12) {
          switch (true) {
            case dateText.includes(`${endGoalTime}:00:00`):
            case dateText.includes(`${endGoalTime - 1}:00:00`):
            case dateText.includes(`${endGoalTime - 2}:00:00`):
              return item;
            default:
              break;
          }
        } else { // if the current time is less than 12, then we need to filter the data to only include mid-day data (1-3PM)
          switch (true) {
            case dateText.includes('13:00:00'):
            case dateText.includes('14:00:00'):
            case dateText.includes('15:00:00'):
              return item;
            default:
              break;
          }
        }
      })
      const day2Summary = day2.filter((item) => {
        let dateText = item.dt_txt.toString();
        if (dateText.includes('13:00:00') || dateText.includes('14:00:00') || dateText.includes('15:00:00')) {
          return item;
        }
      })
      const day3Summary = day3.filter((item) => {
        let dateText = item.dt_txt.toString();
        if (dateText.includes('13:00:00') || dateText.includes('14:00:00') || dateText.includes('15:00:00')) {
          return item;
        }
      })
      const day4Summary = day4.filter((item) => {
        let dateText = item.dt_txt.toString();
        if (dateText.includes('13:00:00') || dateText.includes('14:00:00') || dateText.includes('15:00:00')) {
          return item;
        }
      })
      const day5Summary = day5.filter((item) => {
        let dateText = item.dt_txt.toString();
        if (dateText.includes('13:00:00') || dateText.includes('14:00:00') || dateText.includes('15:00:00')) {
          return item;
        }
      })

      // Loop through each day array and find the min/max temp for each day.
      const day1Min = day1.reduce((min, item) => {
        return item.main.temp_min < min ? item.main.temp_min : min;
      }
        , day1[0].main.temp_min);
      const day1Max = day1.reduce((max, item) => {
        return item.main.temp_max > max ? item.main.temp_max : max;
      }
        , day1[0].main.temp_max);
      const day2Min = day2.reduce((min, item) => {
        return item.main.temp_min < min ? item.main.temp_min : min;
      }
        , day2[0].main.temp_min);
      const day2Max = day2.reduce((max, item) => {
        return item.main.temp_max > max ? item.main.temp_max : max;
      }
        , day2[0].main.temp_max);
      const day3Min = day3.reduce((min, item) => {
        return item.main.temp_min < min ? item.main.temp_min : min;
      }
        , day3[0].main.temp_min);
      const day3Max = day3.reduce((max, item) => {
        return item.main.temp_max > max ? item.main.temp_max : max;
      }
        , day3[0].main.temp_max);
      const day4Min = day4.reduce((min, item) => {
        return item.main.temp_min < min ? item.main.temp_min : min;
      }
        , day4[0].main.temp_min);

      const day4Max = day4.reduce((max, item) => {
        return item.main.temp_max > max ? item.main.temp_max : max;
      }
        , day4[0].main.temp_max);
      const day5Min = day5.reduce((min, item) => {
        return item.main.temp_min < min ? item.main.temp_min : min;
      }
        , day5[0].main.temp_min);
      const day5Max = day5.reduce((max, item) => {
        return item.main.temp_max > max ? item.main.temp_max : max;
      }
        , day5[0].main.temp_max);
      
      // Update the daily summaries with the min/max temp for that day.
      day1Summary[0].main.temp_min = day1Min;
      day1Summary[0].main.temp_max = day1Max;
      day2Summary[0].main.temp_min = day2Min;
      day2Summary[0].main.temp_max = day2Max;
      day3Summary[0].main.temp_min = day3Min;
      day3Summary[0].main.temp_max = day3Max;
      day4Summary[0].main.temp_min = day4Min;
      day4Summary[0].main.temp_max = day4Max;
      day5Summary[0].main.temp_min = day5Min;
      day5Summary[0].main.temp_max = day5Max;

      // Push the daily summaries to the summarizedData array.
      summarizedData.push(day1Summary);
      summarizedData.push(day2Summary);
      summarizedData.push(day3Summary);
      summarizedData.push(day4Summary);
      summarizedData.push(day5Summary);

      console.log('summarizedData: ')
      console.log(summarizedData);

      const test = summarizedData.map((item) => {
        return formatTemp(item[0].main.temp_min);
      })
      console.log('test: ', test);

      return summarizedData;
    }
  };

  const formatDate = (date) => {
    const currentDate = new Date();
    const currentDay = currentDate.getDay();
    // If the current date entered is today, return 'Today'
    if (date.getDay() === currentDay) {
      return 'Today';
      }
      else {
        const dateText = date.toString();
        const dateArray = dateText.split(' ');
        const day = dateArray[0];
        return day;
      }
  }

  const formatTemp = (temp) => {
    return Math.floor(temp -273) + '°C';
  }

  useEffect(() => {
    const summarizedForecast = summarizeForecast();
    console.log('summarizedForecast: ', summarizedForecast)
    console.log('summarizedFiveDayForecast: ', summarizedFiveDayForecast)
    dispatch({
      type: 'SET_SUMMARIZED_FORECAST',
      summarizedFiveDayForecast: summarizedForecast
    })
    console.log('summarizedFiveDayForecast', summarizedFiveDayForecast)
  }, [fiveDayForecast])
    
  if (fiveDayForecast[0]?.main === undefined || summarizedFiveDayForecast === undefined) {
    return (
      <div className='loading-container'>
        <h1>Loading...</h1>
      </div>
    )
  } else {
    return (
      <div className='table-forecast'>
        <Table sx={{
          backgroundColor: 'rgba(40, 86, 163, 0.3)',  
          borderRadius: '1em',
          }} 
          size="small" 
          aria-label="a dense table">
          <TableHead>
            <TableRow>
              <TableCell sx={{color: 'white', borderBottom: 'none', fontSize: '1em'}}l>Date</TableCell>
              <TableCell sx={{color: 'white', borderBottom: 'none'}}> </TableCell>
              <TableCell className="no-border" sx={{color: 'white', borderBottom: 'none', fontSize: '1em'}} align="center">Low °C</TableCell>
              <TableCell className="no-border" sx={{color: 'white', borderBottom: 'none', fontSize: '1em'}} align="center">High °C</TableCell>
              <TableCell className="no-border" sx={{color: 'white', borderBottom: 'none', fontSize: '1em'}} align="center">Wind (m/s)</TableCell>
              <TableCell className="no-border" sx={{color: 'white', borderBottom: 'none', fontSize: '1em'}} align="center">Humidity %</TableCell>
            </TableRow>
          </TableHead>
          <TableBody sx={{color: 'white', borderBottom: 'none'}}>
            {summarizedFiveDayForecast.map((row, index) => (
              <TableRow
                key={index}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell sx={{color: 'white', borderBottom: 'none'}} component="th" scope="row">
                  {formatDate(row[0].dt_txt)}
                </TableCell>
                <TableCell className="no-border" sx={{color: 'white', borderBottom: 'none'}} align='center'><Icon icon={row[0].weather[0].icon} height='25px' width='30px'/></TableCell>
                <TableCell className="no-border" sx={{color: 'white', borderBottom: 'none'}} align="center">{formatTemp(row[0].main.temp_min)}</TableCell>
                <TableCell className="no-border" sx={{color: 'white', borderBottom: 'none'}} align="center">{formatTemp(row[0].main.temp_max)}</TableCell>
                <TableCell className="no-border" sx={{color: 'white', borderBottom: 'none'}} align="center">{row[0].wind.speed}</TableCell>
                <TableCell className="no-border" sx={{color: 'white', borderBottom: 'none'}} align="center">{row[0].main.humidity}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}