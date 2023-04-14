import React, { createContext, useContext } from 'react';
import { useWeatherReducer } from '../utils/reducers'

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useWeatherReducer({
    currentCity: 'Toronto',
    todaysWeather: {},
    fiveDayForecast: [],
    summarizedFiveDayForecast: [],
    geoCoordinates: {
      lat: 43.6535, 
      lon: -79.3839
    },
    timezone: 'GTM-4:00',
    searchHistory: [],
  });

  return (
    <WeatherContext.Provider value={[state, dispatch]}>
      {children}
    </WeatherContext.Provider>
  );
}

export const useWeatherContext = () => {
  return useContext(WeatherContext);
}
