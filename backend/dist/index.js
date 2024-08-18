"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const openmeteo_1 = require("openmeteo");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
function formatTimeToAMPM(dateTime) {
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();
    const ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
    return `${hours}:${formattedMinutes} ${ampm}`;
}
const range = (start, stop, step) => Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);
app.get('/weather', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const latitude = req.query.latitude;
    const longitude = req.query.longitude;
    const selectedDate = req.query.selectedDate;
    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }
    // Define params for the API request
    const params = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        hourly: "temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m",
        current: "temperature_2m,apparent_temperature,weather_code",
        timezone: "auto",
        start_date: selectedDate,
        end_date: selectedDate,
    };
    // API endpoint
    const url = 'https://api.open-meteo.com/v1/forecast';
    try {
        // Fetching data
        const responses = yield (0, openmeteo_1.fetchWeatherApi)(url, params);
        const response = responses[0];
        const hourly = response.hourly();
        const current = response.current();
        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            hourlyTemp: hourly.variables(0).valuesArray(),
            hourlyAppTemp: hourly.variables(1).valuesArray(),
            hourlyPrecProb: hourly.variables(2).valuesArray(),
            hourlyWeatherCode: hourly.variables(3).valuesArray(),
            hourlyWindSpeed: hourly.variables(4).valuesArray(),
            currTemp: current.variables(0).value(),
            currAppTemp: current.variables(1).value(),
            currWeatherCode: current.variables(2).value(),
        };
        // Send the processed weather data as JSON response
        res.json(weatherData);
    }
    catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
}));
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
    console.log(`Server is running on port ${port}`);
});
