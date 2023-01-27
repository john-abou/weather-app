// Define the global variables
let lat;
let long;
let apiKey = '5d82752b5eec77e02284baee59150776';
let searchHistory = [];

// Create a function to save the search history to local storage

// Create a function to get the search history from local storage and update the preset buttons

// Create a function to get the latitude and longitude from the OpenWeather API

// Create a function to get the weather from the OpenWeather API

// Create a function to display the weather data on the page
const getWeather = async (lat, long) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`
    );
    const weatherData = await response.json();
    return weatherData;
    }

// Define the DOM variables used with event listeners
let asideElement = document.querySelector('aside');

// Make an event listener for the button that calls the getWeather function
asideElement.addEventListener('click', function(event) {

    let elementClicked  = event.target; // Get the element that was clicked
    
    // verify that the element clicked was a button
    if (elementClicked.matches('button')) {
        
        // Grab the city name from the button that was clicked.
        // For the search bar, grab the city name from the input field
        // When using the preset buttons, grab the city name from the button text
        if (elementClicked.matches('.search')) {
            let city = document.querySelector('input').value;
        } else {
            let city = elementClicked.textContent;
        }

        // Save the city name to local storage and update the preset-button text elements


        // Use the city to get the latitude and longitude --> getLatLong(city);
    
    
        // Use the latitude and longited to get the weather --> getWeather(lat, long);
    }
});
