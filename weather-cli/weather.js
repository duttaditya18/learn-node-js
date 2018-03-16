const http = require('http');
const https = require('https');
const api = require('./api.json');

function printError(error) {
    console.error(error.message);
}

function printWeather(weather) {
    const temp = Math.round((parseFloat(weather.main.temp) - 273.15) * 100) / 100;
    const description = weather.weather[0].description.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    const lat = Math.abs(weather.coord.lat);
    const lon =  Math.abs(weather.coord.lon); 
    const latdir = lat > 0 ? "N" : "S";
    const londir = lon > 0 ? "W" : "E";
    const message = `Current Weather in ${weather.name}, ${weather.sys.country} (${lat}°${latdir}, ${lon}°${londir}) is ${description} and the Temperature is ${temp}°C.`;
    console.log(message);
}

function get(query) {
    const readableQuery = query.replace(',',' , ');
    try {
        const request = https.get(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${api.key}`, response => {
            if (response.statusCode === 200) {
                let body = "";
                response.on('data', chunk => {
                    body += chunk;
                });
                response.on('end', () => {
                    try {
                        const weather = JSON.parse(body);
                        if(weather.name) {
                            printWeather(weather);
                        } else {
                            const querryError = new Error(`The location "${readableQuery}" was not found.`);
                            printError(querryError);
                        }
                    } catch(error) {
                        printError(error);
                    }
                });
            } else {
                const statusCodeError = new Error(`There was an error (${response.statusCode} : ${http.STATUS_CODES[response.statusCode]})`);
                printError(statusCodeError);
            }
        });
    } catch(error) {
        printError(error);
    }
}

// Wunderground = 37aa734555834b61
// OpenWeatherMap = 0c4c95731e2a4ac750649d48be7de08e

module.exports.get = get;