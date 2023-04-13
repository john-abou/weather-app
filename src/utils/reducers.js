import { 
  UPDATE_GEOCOORDINATES, 
  UPDATE_CURRENT_CITY, 
  TODAYS_WEATHER, 
  FIVE_DAY_FORECAST,
  SET_SUMMARIZED_FORECAST
} from './actions.js'
import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_GEOCOORDINATES:
      return {
        ...state,
        geoCoordinates: action.geoCoordinates
      };
    case UPDATE_CURRENT_CITY:
      return {
        ...state,
        currentCity: action.currentCity
      };
    case TODAYS_WEATHER:
      return {
        ...state,
        todaysWeather: action.todaysWeather
      };
    case FIVE_DAY_FORECAST:
      return {
        ...state,
        fiveDayForecast: action.fiveDayForecast
      };    
    case SET_SUMMARIZED_FORECAST:
      return {
        ...state,
        summarizedFiveDayForecast: action.summarizedFiveDayForecast
      };
    default:
      return state;
  }
}

export const useWeatherReducer = (initialState) => {
  return useReducer(reducer, initialState);
}