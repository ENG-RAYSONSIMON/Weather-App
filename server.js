const express = require("express");
const https = require("https");
const bodyparser = require("body-parser");
const path = require("path");

const app = express();

// Configuration - Store sensitive data in environment variables
const CONFIG = {
    PORT: process.env.PORT || 5000,
    API_KEY: process.env.OPENWEATHER_API_KEY || "814912474443882e4b82d90a26772a3f",
    API_URL: "https://api.openweathermap.org/data/2.5/weather"
};

// Middleware
app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static('public')); // Serve static files (CSS, JS, images)

// Routes
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.post('/weather', (req, res) => {
    const cityName = req.body.cityName;

    // Validate input
    if (!cityName || cityName.trim() === '') {
        return res.status(400).send(renderErrorPage("Please enter a valid city name"));
    }

    getWeatherData(cityName)
        .then(weatherData => {
            res.send(renderWeatherPage(weatherData));
        })
        .catch(error => {
            console.error("Error fetching weather:", error.message);
            res.status(500).send(renderErrorPage("City not found or API error. Please try again."));
        });
});

// Weather API function - Separated logic
function getWeatherData(city) {
    return new Promise((resolve, reject) => {
        const url = `${CONFIG.API_URL}?q=${encodeURIComponent(city)}&units=metric&appid=${CONFIG.API_KEY}`;

        https.get(url, (response) => {
            let data = '';

            response.on('data', (chunk) => {
                data += chunk;
            });

            response.on('end', () => {
                try {
                    const weatherData = JSON.parse(data);

                    if (response.statusCode === 200) {
                        resolve({
                            city: weatherData.name,
                            country: weatherData.sys.country,
                            temp: weatherData.main.temp,
                            feelsLike: weatherData.main.feels_like,
                            description: weatherData.weather[0].description,
                            icon: weatherData.weather[0].icon,
                            humidity: weatherData.main.humidity,
                            windSpeed: weatherData.wind.speed,
                            pressure: weatherData.main.pressure
                        });
                    } else {
                        reject(new Error(weatherData.message || 'City not found'));
                    }
                } catch (error) {
                    reject(new Error('Failed to parse weather data'));
                }
            });
        }).on('error', (error) => {
            reject(error);
        });
    });
}

// HTML Templates - Separated from logic
function renderWeatherPage(data) {
    const imageURL = `https://openweathermap.org/img/wn/${data.icon}@2x.png`;

    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Weather Results - ${data.city}</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
        <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-10 col-lg-8">
                    <div class="weather-card">
                        <div class="text-center mb-4">
                            <div class="city-name mb-2">
                                <i class="bi bi-geo-alt-fill text-primary"></i>
                                ${data.city}, ${data.country}
                            </div>
                            <div class="weather-description">${data.description}</div>
                        </div>

                        <div class="text-center mb-4">
                            <img src="${imageURL}" alt="Weather icon" class="weather-icon-large">
                            <div class="temp-display">${Math.round(data.temp)}°C</div>
                        </div>

                        <div class="row">
                            <div class="col-md-4">
                                <div class="stat-card">
                                    <div class="stat-icon"><i class="bi bi-thermometer-half"></i></div>
                                    <div class="stat-value">${Math.round(data.feelsLike)}°C</div>
                                    <div class="stat-label">Feels Like</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="stat-card">
                                    <div class="stat-icon"><i class="bi bi-droplet-fill"></i></div>
                                    <div class="stat-value">${data.humidity}%</div>
                                    <div class="stat-label">Humidity</div>
                                </div>
                            </div>
                            <div class="col-md-4">
                                <div class="stat-card">
                                    <div class="stat-icon"><i class="bi bi-wind"></i></div>
                                    <div class="stat-value">${data.windSpeed} m/s</div>
                                    <div class="stat-label">Wind Speed</div>
                                </div>
                            </div>
                        </div>

                        <div class="text-center mt-4">
                            <a href="/" class="btn btn-back">
                                <i class="bi bi-arrow-left me-2"></i>Search Another City
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <footer class="footer">
            <p class="footer-text">
                Powered by <span class="brand-name">Tellam Tech</span> &copy; ${new Date().getFullYear()}
            </p>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `;
}

function renderErrorPage(message) {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Error - Weather App</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css">
        <link rel="stylesheet" href="/css/styles.css">
    </head>
    <body>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-12 col-md-8 col-lg-6">
                    <div class="weather-card text-center">
                        <i class="bi bi-exclamation-triangle-fill text-danger" style="font-size: 4rem;"></i>
                        <h2 class="mt-3 mb-3">Oops!</h2>
                        <p class="text-muted mb-4">${message}</p>
                        <a href="/" class="btn btn-back">
                            <i class="bi bi-arrow-left me-2"></i>Try Again
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <footer class="footer">
            <p class="footer-text">
                Powered by <span class="brand-name">Tellam Tech</span> &copy; ${new Date().getFullYear()}
            </p>
        </footer>

        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
    </body>
    </html>
  `;
}

// Start server
app.listen(CONFIG.PORT, () => {
    console.log(`Server is running on port ${CONFIG.PORT}`);
});