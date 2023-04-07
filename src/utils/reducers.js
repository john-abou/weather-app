import { UPDATE_SEARCH, CURRENT_CITY, CITY_WEATHER } from './actions.js'
import { useReducer } from 'react';

export const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_SEARCH:
      return {
        ...state,
        search: action.search
      };
    case CURRENT_CITY:
      return {
        ...state,
        currentCity: action.currentCity
      };
    case CITY_WEATHER:
      return {
        ...state,
        cityWeather: action.cityWeather
      };
    default:
      return state;
  }
}

export const useWeatherReducer = (initialState) => {
  return useReducer(reducer, initialState);
}