import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useWeatherContext } from '../../contexts';
import { UPDATE_CURRENT_CITY, UPDATE_GEOCOORDINATES } from '../../utils/actions';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  // Get the state and dispatch from the context
  const [state, dispatch] = useWeatherContext();

  // Create a function to handle the search submit - it will dispatch the action to update the current city
  const handleSearchSubmit = async (e) => {
    e.preventDefault();
    // update the state of the current city
    dispatch({
      type: UPDATE_CURRENT_CITY,
      currentCity: e.target.value
    });

    // Use openweather API to get geocoordinate data for the city searched
    const queryString = 'https://api.openweathermap.org/geo/1.0/direct?q=' + e.target.value + '&appid=5d82752b5eec77e02284baee59150776';
    const response = await fetch(queryString);
    if (response.ok) { 
      const data = await response.json()
      const geoCoordinates = {
        lat: data[0].lat, 
        lon: data[0].lon
        };
      // update the state with the cities geocoordinates
      dispatch({
        type: UPDATE_GEOCOORDINATES,
        geoCoordinates: geoCoordinates
      });
    } else {
      console.log('Error: ' + response.statusText);
    }
  };
  
  return (
    <Box sx={{ 
      flexGrow: 1, 
    }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Weather App
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search a city…"
              inputProps={{ 'aria-label': 'search' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSearchSubmit(e);
                }
              }}
            />
          </Search>
        </Toolbar>
      </AppBar>
    </Box>
  );
}