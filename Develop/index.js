// Define all variables
// Define the global variables
let APIkey = '5d82752b5eec77e02284baee59150776';
let searchHistory = [];

// Define the DOM variables
let currentWeatherElement = document.querySelector('#current-weather');
let asideElement = document.querySelector('aside');
let forecastElement = document.querySelector('#forecast');
let searchHistoryElement = document.querySelector('#search-history-container');



//Define all the functions
// Create a function to run on the start of the page
function init() {
    // Check if there is a search history in local storage
    if (!getSearchHistory()) {
        searchHistory = [];
        getCoordinates("Toronto");
    } else {
        getCoordinates(searchHistory[0]);
    }    
}

//Create a function to make the iso date time from the response into a human readable timestamp.
function isoToReadableDate( isoNumber ) {
    let milliseconds = isoNumber * 1000;
    let dateObject = new Date(milliseconds);
    humanDateFormat = dateObject.toLocaleString();
    humanDateFormat = humanDateFormat.substring(0, humanDateFormat.length-12); // remove the hours, minutes, and seconds from the date
    return humanDateFormat;
}

// Create a function to save the search history to local storage
function saveSearchHistory(city) {
    if (city !== "") {
        searchHistory.unshift(city);
        localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    }
}

// Create a function to get the search history from local storage and update the preset buttons
function getSearchHistory() {
    searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (searchHistory) {
        // Clear the search history buttons
        searchHistoryElement.innerHTML = "";

        // Make the search history buttons for everything in history
        for (let i = 0; i < searchHistory.length && i<5 ; i++) {
            let newButton = document.createElement('button');
            newButton.setAttribute('class', 'btn btn-dark search-history');
            searchHistoryElement.appendChild(newButton);
            document.querySelectorAll('.search-history')[i].textContent = searchHistory[i]; 
        }
    }
}

// Create a function to get the latitude and longitude from the OpenWeather API
function getCoordinates( cityName ) {
    let queryString = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&appid=' + APIkey;

    // Make the API call
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

            // Store the latitude and longitude as a data attribute which can be called later.
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
    // Retrieve the latitude and longitude from the current weather element
    let lat = currentWeatherElement.getAttribute('data-lat');
    let lon = currentWeatherElement.getAttribute('data-lon');
    let queryString = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIkey;

    // Make the API call
    fetch(queryString)
        .then(function (response) {
            if (!response.ok) {
                throw response.json();
            }
        
            return response.json();
        })

        .then(function (data) {
            // Use a for loop to get the data for the next 5 days from the API response
            // Use a counter to keep track of the index for the forecast cards
            let index=0;
            for ( let i=7 ; i < 40; i=i+8) {
                // Grab all the data needed from the API response
                let date = isoToReadableDate(data.list[i].dt);
                let iconCode = data.list[i].weather[0].icon;
                let temp = Math.floor(data.list[i].main.temp - 275.15);
                let windSpeed = data.list[i].wind.speed;
                let humidity = data.list[i].main.humidity;

                // Define the current forecast card then update the index
                let forecastCard = forecastElement.children[index].children[0];
                index++;

                // Update the current forecast card with the data from the API response
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
    
    // Check if the search button was clicked and ensure the input is not empty
    if (elementClicked.matches('.search')) {
        city = document.querySelector('input').value; // Get the value from the input
        if (city !== "") {
            getCoordinates(city);
            saveSearchHistory(city);
            getSearchHistory(); 
        }
    }
    // Else, if the search history button was clicked, get the coordinates for the city
    else if (elementClicked.matches('button')) {
        let city = elementClicked.textContent; // Get the text from the button
        getCoordinates(city);
        saveSearchHistory(city);
        getSearchHistory();
    } 
}

init();

// Make an event listener for the button that calls the getWeather function
asideElement.addEventListener('click', buttonClickHandler);