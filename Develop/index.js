// Define all variables
// Define the global variables
let APIkey = '5d82752b5eec77e02284baee59150776';
let searchHistory = [];

// Define the DOM variables
let currentWeatherElement = document.querySelector('#current-weather');
let asideElement = document.querySelector('aside');
let forecastElement = document.querySelector('#forecast');


// Define all the variables
//Create a function to make the iso date time to a human readable timestamp.
function isoToReadableDate( isoNumber ) {
    let milliseconds = isoNumber * 1000;
    let dateObject = new Date(milliseconds);
    humanDateFormat = dateObject.toLocaleString();
    humanDateFormat = humanDateFormat.substring(0, humanDateFormat.length-12);
    return humanDateFormat;
}

// Create a function to run on the start of the page
function init() {
    getCoordinates("Toronto");
}

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
            currentWeatherElement.children[0].innerHTML = cityName;
            currentWeatherElement.setAttribute('data-lat', latitude);
            currentWeatherElement.setAttribute('data-lon', longitude);


            // After the city has been retrieved, get the current weather and future weather
            getCurrentWeather();
            getForecastWeather();
        })        
}

//Create a function to get the current weather from the OpenWeather API
function getCurrentWeather () {
    let lat = currentWeatherElement.getAttribute('data-lat');
    let long = currentWeatherElement.getAttribute('data-lon');
    let queryString = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + "&appid=" + APIkey;

    
    fetch(queryString)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }

            return response.json();
        })
        .then(function (data) {
            //Grab the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed
            let temp = Math.floor(data.main['temp'] - 275.15);
            let iconCode = data.weather[0]["icon"];
            let humidity = data.main["humidity"];
            let windSpeed = data.wind["speed"];
            let date = isoToReadableDate(data.dt);
            

            currentWeatherElement.children[0].innerHTML += " " + date;
            currentWeatherElement.children[1].setAttribute("src", "./Assets/Images/icons/" + iconCode + ".png");
            currentWeatherElement.children[2].innerHTML = "Temp: " + temp + "°C";
            currentWeatherElement.children[3].innerHTML = "Humidity: " + humidity + "%";
            currentWeatherElement.children[4].innerHTML = "Wind Speed: " + windSpeed + "m/s";
        })
    }

// Create a function to display the forecast weather data on the page
function getForecastWeather () {
    let lat = currentWeatherElement.getAttribute('data-lat');
    let lon = currentWeatherElement.getAttribute('data-lon');
    let queryString = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;

    fetch(queryString)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
        
            return response.json();
        })

        .then(function (data) {
            console.log(data.list);

            // Use a for loop to get the data for the next 5 days
            // for the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity
            let index=0;
            for ( let i=0 ; i < 40; i=i+8) {
                // This part of the for loop works as intended -- it is grabbing data for every 8th index in the array (daily data)
                let date = isoToReadableDate(data.list[i].dt);
                let iconCode = data.list[i].weather[0].icon;
                let temp = Math.floor(data.list[i].main.temp - 275.15);
                let windSpeed = data.list[i].wind.speed;
                let humidity = data.list[i].main.humidity;
                console.log(date, iconCode, temp, windSpeed, humidity);

                let forecastCard = forecastElement.children[index].children[0];
                index++;

                forecastCard.children[0].textContent = date;
                forecastCard.children[1].setAttribute("src", "./Assets/Images/icons/" + iconCode + ".png");
                forecastCard.children[2].textContent = "Temp: " + temp + "°C";
                forecastCard.children[3].textContent = "Wind Speed: " + windSpeed + "m/s";
                forecastCard.children[4].textContent = "Humidity: " + humidity + "%";
            }
            
        })
    
}

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

init();

// Make an event listener for the button that calls the getWeather function
asideElement.addEventListener('click', buttonClickHandler);