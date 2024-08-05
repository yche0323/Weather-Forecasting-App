import React, { useState, useEffect } from "react";
import { processWeatherCode } from "../Scripts/ProcessWeatherCode";

interface CurrentWeatherComponentProps {
  currTemp: number;
  currAppTemp: number;
  currWeatherCode: number;
}

const CurrentWeatherComponent: React.FC<CurrentWeatherComponentProps> = ({
  currTemp,
  currAppTemp,
  currWeatherCode,
}) => {
  const [weatherDescription, setWeatherDescription] = useState<string>("");
  const [iconFilePath, setIconFilePath] = useState<string>("");

  useEffect(() => {
    const weatherCodeResult = processWeatherCode(currWeatherCode);
    setWeatherDescription(weatherCodeResult["weatherDescription"]);
    setIconFilePath(`/WeatherIcons/${weatherCodeResult["iconFilePath"]}`);
  }, [currWeatherCode]);

  return (
    <div className="current-weather-displayer">
      <div>
        <div className="weather">
          <img src={iconFilePath} alt={weatherDescription} />
          <p>{weatherDescription}</p>
        </div>
        <div className="temperature">
          <p className="curr-temp">{currTemp.toFixed(1)}°C</p>
          <p className="app-temp">Feels like: {currAppTemp.toFixed(1)}°C</p>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeatherComponent;
