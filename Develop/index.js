// Define the global variables
let APIkey = '5d82752b5eec77e02284baee59150776';
let searchHistory = [];

// Define the DOM variables
let currentWeatherElement = document.querySelector('#current-weather');
let asideElement = document.querySelector('aside');

// Create a function to save the search history to local storage
function saveSearchHistory() {
    let currentSearch = document.querySelector('input').value();
    searchHistory.push(currentSearch);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
}

// Create a function to get the search history from local storage and update the preset buttons
function getSearchHistory() {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (searchHistory) {
        for (let i = 0; i < searchHistory.length; i++) {
            document.querySelectorAll('.preset-button')[i].textContent = searchHistory[i];
        }
    }
}

// Create a function to get the latitude and longitude from the OpenWeather API
function getCoordinates( cityName ) {
    let queryString = 'http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + APIkey;

    fetch(queryString)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            // return the response as a JSON object
            return response.json();
        })
        .then(function returnCoords (data) {

            // Get the latitude and longitude from the response.
            let latitude = data[0]['lat'];
            let longitude = data[0]['lon'];
            currentWeatherElement.setAttribute('data-lat', latitude);
            currentWeatherElement.setAttribute('data-lon', longitude);


            // After the city has been retrieved, get the current weather and future weather
            getCurrentWeather();
        })        
}

function isoToReadableDate( isoNumber ) {
    let milliseconds = isoNumber * 1000;
    let dateObject = new Date(milliseconds);
    humanDateFormat = dateObject.toLocaleString();
    return humanDateFormat;
}

//Create a function to get the current weather from the OpenWeather API
function getCurrentWeather () {
    let lat = currentWeatherElement.getAttribute('data-lat');
    let long = currentWeatherElement.getAttribute('data-lon');
    let queryString = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + "&appid="+ APIkey;
    
    fetch(queryString)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (data) {
            console.log(data);
            //the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
            console.log(data.main["temp"]);
            console.log(data.weather[0]["icon"]); // ---> this does not produce an icon
            // Fill the src attr for the icon with the string: https://stackoverflow.com/questions/44177417/how-to-display-openweathermap-weather-icon
            console.log(data.main["humidity"]);
            console.log(data.wind["speed"])
        })
    }

// Create a function to display the weather data on the page


// Create a function to handle the button click handlers
function buttonClickHandler (event) {
    let elementClicked  = event.target; // Get the element that was clicked
    
    // verify that the element clicked was a button
    if (elementClicked.matches('button')) {
        // For the search bar, grab the city name from the input field
        // When using the preset buttons, grab the city name from the button text
        if (elementClicked.matches('.search')) {
            let city = document.querySelector('input').value;
            getCoordinates(city);
                // getFutureWeather(coordinates);
            } else {
            let city = elementClicked.textContent;
            getCoordinates(city);
                // getFutureWeather(coordinates);
            };

        // Save the city name to local storage and update the preset-button text elements


        // Use the city to get the latitude and longitude --> getLatLong(city);
    
    
        // Use the latitude and longited to get the weather --> getWeather(lat, long);
    }
}

// Make an event listener for the button that calls the getWeather function
asideElement.addEventListener('click', buttonClickHandler);