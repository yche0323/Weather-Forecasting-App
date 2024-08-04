import express, { Express, Request, Response } from 'express';
import { fetchWeatherApi } from "openmeteo";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());

function formatTimeToAMPM(dateTime: Date): string{
    let hours = dateTime.getHours();
    const minutes = dateTime.getMinutes();

    const ampm = hours >= 12 ? 'pm' : 'am';

    hours = hours % 12;
    hours = hours ? hours : 12;

    const formattedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;

    return `${hours}:${formattedMinutes} ${ampm}`;
}

const range = (start: number, stop: number, step: number) =>
	Array.from({ length: (stop - start) / step }, (_, i) => start + i * step);

app.get('/weather', async (req: Request, res: Response) => {
    const latitude = req.query.latitude as string;
    const longitude = req.query.longitude as string;
    const selectedDate = req.query.selectedDate as string;

    if (!latitude || !longitude) {
        return res.status(400).json({ error: 'Latitude and longitude are required' });
    }

    // Define params for the API request
    const params = {
        latitude: parseFloat(latitude),
        longitude: parseFloat(longitude),
        hourly: "temperature_2m,apparent_temperature,precipitation_probability,weather_code,wind_speed_10m",
        daily: "weather_code,temperature_2m_max,temperature_2m_min,sunrise,sunset,uv_index_max",
        current: "temperature_2m,apparent_temperature,weather_code,wind_speed_10m",
        timezone: "auto",
        start_date: selectedDate,
        end_date: selectedDate,
    };

    // API endpoint
    const url = 'https://api.open-meteo.com/v1/forecast';

    try{
        // Fetching data
        const responses = await fetchWeatherApi(url, params);

        const response = responses[0];

        const utcOffsetSeconds = response.utcOffsetSeconds();

        const hourly = response.hourly()!;
        const daily = response.daily()!;
        const current = response.current()!;

        let sunriseTimes: string[] = [];
        let sunsetTimes: string[] = [];

        for(let i = 0; i < daily.variables(3)!.valuesInt64Length(); i++){
            let sunriseTime: number = Number(daily.variables(3)!.valuesInt64(i)!);
            let sunsetTime: number = Number(daily.variables(4)!.valuesInt64(i)!);

            sunriseTimes.push(formatTimeToAMPM(new Date((sunriseTime + utcOffsetSeconds) * 1000)));
            sunsetTimes.push(formatTimeToAMPM(new Date((sunsetTime + utcOffsetSeconds) * 1000)));
        }

        // Note: The order of weather variables in the URL query and the indices below need to match!
        const weatherData = {
            hourlyTemp: hourly.variables(0)!.valuesArray()!,
            hourlyAppTemp: hourly.variables(1)!.valuesArray()!,
            hourlyPrecProb: hourly.variables(2)!.valuesArray()!,
            hourlyWeatherCode: hourly.variables(3)!.valuesArray()!,
            hourlyWindSpeed: hourly.variables(4)!.valuesArray()!,
            dates: range(Number(daily.time()), Number(daily.timeEnd()), daily.interval()).map(
                (t) => new Date((t + utcOffsetSeconds) * 1000)
            ),
            dailyWeatherCode: daily.variables(0)!.valuesArray()!,
            dailyMaxTemp: daily.variables(1)!.valuesArray()!,
            dailyMinTemp: daily.variables(2)!.valuesArray()!,
            dailySunrise: sunriseTimes,
            dailySunset: sunsetTimes,
            dailyUVIndex: daily.variables(5)!.valuesArray()!,
            currTemp: current.variables(0)!.valuesArray()!,
            currAppTemp: current.variables(1)!.valuesArray()!,
            currWeatherCode: current.variables(2)!.valuesArray()!,
            currWindSpeed: current.variables(3)!.valuesArray()!,
        };

        // Send the processed weather data as JSON response
        res.json(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        res.status(500).json({ error: 'Failed to fetch weather data' });
    }
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
