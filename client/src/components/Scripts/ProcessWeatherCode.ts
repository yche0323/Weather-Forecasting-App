export function processWeatherCode(weatherCode: number) {
    let weatherDescription: string;
    let iconFilePath: string;

    switch (weatherCode) {
        case 0:
            weatherDescription = "Clear Sky";
            iconFilePath = "clear-day";
            break;
        case 1:
            weatherDescription = "Mainly Clear";
            iconFilePath = "partly-cloudy-day";
            break;
        case 2:
            weatherDescription = "Partly Cloudy";
            iconFilePath = "partly-cloudy-day";
            break;
        case 3:
            weatherDescription = "Overcast";
            iconFilePath = "overcast";
            break;
        case 45:
        case 48:
            weatherDescription = "Foggy";
            iconFilePath = "fog";
            break;
        case 51:
            weatherDescription = "Light drizzle";
            iconFilePath = "drizzle";
            break;
        case 53:
            weatherDescription = "Moderate drizzle";
            iconFilePath = "drizzle";
            break;
        case 55:
            weatherDescription = "Dense drizzle";
            iconFilePath = "drizzle";
            break;
        case 56:
            weatherDescription = "Light freezing drizzle";
            iconFilePath = "drizzle";
            break;
        case 57:
            weatherDescription = "Dense freezing drizzle";
            iconFilePath = "drizzle";
            break;
        case 61:
            weatherDescription = "Slight rain";
            iconFilePath = "rain";
            break;
        case 63:
            weatherDescription = "Moderate rain";
            iconFilePath = "rain";
            break;
        case 65:
            weatherDescription = "Heavy rain";
            iconFilePath = "rain";
            break;
        case 66:
            weatherDescription = "Light freezing rain";
            iconFilePath = "rain";
            break;
        case 67:
            weatherDescription = "Heavy freezing rain";
            iconFilePath = "rain";
            break;
        case 71:
            weatherDescription = "Slight snow fall";
            iconFilePath = "snow";
            break;
        case 73:
            weatherDescription = "Moderate snow fall";
            iconFilePath = "snow";
            break;
        case 75:
            weatherDescription = "Heavy snow fall";
            iconFilePath = "snow";
            break;
        case 77:
            weatherDescription = "Snow grains";
            iconFilePath = "snow";
            break;
        case 80:
            weatherDescription = "Slight rain showers";
            iconFilePath = "rain";
            break;
        case 81:
            weatherDescription = "Moderate rain showers";
            iconFilePath = "rain";
            break;
        case 82:
            weatherDescription = "Violent rain showers";
            iconFilePath = "rain";
            break;
        case 85:
            weatherDescription = "Slight snow showers";
            iconFilePath = "snow";
            break;
        case 86:
            weatherDescription = "Heavy snow showers";
            iconFilePath = "snow";
            break;
        case 95:
            weatherDescription = "Thunderstorm";
            iconFilePath = "thunderstorms";
            break;
        case 96:
            weatherDescription = "Thunderstorm with slight hail";
            iconFilePath = "thunderstorms";
            break;
        case 99:
            weatherDescription = "Thunderstorm with heavy hail";
            iconFilePath = "thunderstorms";
            break;
        default:
            weatherDescription = "Unknown weather code";
            iconFilePath = "unknown";
    }

    const result = {
        "weatherDescription": weatherDescription,
        "iconFilePath": `${iconFilePath}.svg`
    }
    return result;
}