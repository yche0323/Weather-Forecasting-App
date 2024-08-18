import React, { useState, useEffect } from "react";
import LineChart from "./WeatherSubcomponents/LineChart";
import BarChart from "./WeatherSubcomponents/BarChart";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://backend-production-1b42.up.railway.app";

interface WeatherComponentProps {
  setCurrWeatherData: (
    currTemp: number,
    currAppTemp: number,
    currWeatherCode: number
  ) => void;
  latitude: string;
  longitude: string;
  location: string;
  selectedDate: string;
}

interface AnyObject {
  [key: string]: any;
}

interface HourlyWeatherData {
  date: string;
  hourlyTemp: number[];
  hourlyAppTemp: number[];
  hourlyPrecProb: number[];
  hourlyWeatherCode: number[];
  hourlyWindSpeed: number[];
}

const generateHours = (): string[] => {
  const result: string[] = [];

  for (let i = 0; i < 24; i++) {
    if (i < 10) {
      result.push(`0${i}:00`);
    } else {
      result.push(`${i}:00`);
    }
  }

  return result;
};

const processHourlyWeatherData = (data: AnyObject): HourlyWeatherData => {
  const arrObject: AnyObject = {};

  // Convert values in the data object to arrays if they are objects
  for (const [key, value] of Object.entries(data)) {
    if (typeof value == "object" && !Array.isArray(value) && value !== null) {
      arrObject[key] = Object.values(value);
    } else {
      arrObject[key] = value;
    }
  }

  const result = {} as HourlyWeatherData;
  result.hourlyTemp = arrObject.hourlyTemp;
  result.hourlyAppTemp = arrObject.hourlyAppTemp;
  result.hourlyPrecProb = arrObject.hourlyPrecProb;
  result.hourlyWeatherCode = arrObject.hourlyWeatherCode;
  result.hourlyWindSpeed = arrObject.hourlyWindSpeed;

  return result;
};

const WeatherComponent: React.FC<WeatherComponentProps> = ({
  setCurrWeatherData,
  latitude,
  longitude,
  location,
  selectedDate,
}) => {
  const [hourlyWeatherData, setHourlyWeatherData] =
    useState<HourlyWeatherData | null>(null);
  const [error, setError] = useState("");
  const hours = generateHours();

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `${API_URL}/weather?latitude=${latitude}&longitude=${longitude}&selectedDate=${selectedDate}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        const hourlyData = processHourlyWeatherData(data);
        setHourlyWeatherData(hourlyData);
        setCurrWeatherData(
          data.currTemp,
          data.currAppTemp,
          data.currWeatherCode
        );
        setError("");
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
        setHourlyWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [
    latitude,
    longitude,
    location,
    selectedDate,
    hourlyWeatherData,
    setCurrWeatherData,
  ]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {hourlyWeatherData && (
        <div>
          <LineChart
            data={[
              hourlyWeatherData.hourlyTemp,
              hourlyWeatherData.hourlyAppTemp,
            ]}
            labels={hours}
            dataLabels={["Temperature", "Feels Like"]}
            unit={["°C", "°C"]}
            borderColors={["red", "blue"]}
            borderDashes={[[], [5, 5]]}
          />
          <LineChart
            data={[hourlyWeatherData.hourlyWindSpeed]}
            labels={hours}
            dataLabels={["Wind Speed"]}
            unit={["km/h"]}
            borderColors={["green"]}
            borderDashes={[[]]}
          />
          <BarChart
            data={[hourlyWeatherData.hourlyPrecProb]}
            labels={hours}
            dataLabels={["Precipitation Probability"]}
            unit={["%"]}
            backgroundColors={["purple"]}
          />
        </div>
      )}
    </div>
  );
};

export default WeatherComponent;
