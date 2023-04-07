import React, { createContext, useContext } from 'react';
import { useWeatherReducer } from '../utils/reducers'

const WeatherContext = createContext();

export const WeatherProvider = ({ children }) => {
  const [state, dispatch] = useWeatherReducer({
    search: '',
    loading: false,
    currentCity: '',
    searchHistory: [],
    cityWeather: []
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
