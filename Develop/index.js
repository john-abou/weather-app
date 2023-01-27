// Create a function to make a fetch request to the OpenWeather API
// The function should accept lat and long and return the weather data for that city

let lat;
let long;
let apiKey = '5d82752b5eec77e02284baee59150776';

// Define the DOM variables used with event listeners
let asideElement = document.querySelector('aside');

// Make an event listener for the button that calls the getWeather function
asideElement.addEventListener('click', function(event) {

    let elementClicked  = event.target; // Get the element that was clicked
    
    // verify that the element clicked was a button
    if (elementClicked.matches('button')) {
    
    // Grab the city name from the button that was clicked
    // If using the search bar, grab the city name from the input field
    // If using the buttons, grab the city name from the button text

    // Get the latitude and longitude from the geoLocation API
    
    
    // getWeather(lat, long);
    }
});

// Create a function to make a fetch request to the OpenWeather API
// The function should accept lat and long and return the weather data for that city

const getWeather = async (lat, long) => {
    const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=imperial`
    );
    const weatherData = await response.json();
    return weatherData;
    }