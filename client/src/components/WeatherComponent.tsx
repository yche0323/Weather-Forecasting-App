import React, { useState, useEffect } from "react";
import LineChart from "./WeatherSubcomponents/LineChart";

interface WeatherComponentProps {
  latitude: string;
  longitude: string;
  location: string;
}

interface AnyObject {
  [key: string]: any;
}

interface DailyWeatherData {
  date: string;
  hourlyTemp: number[];
  hourlyAppTemp: number[];
  hourlyPrecProb: number[];
  hourlyPrec: number[];
  hourlyWeatherCode: number[];
  hourlyWindSpeed: number[];
  dailyWeatherCode: number;
  dailyMaxTemp: number;
  dailyMinTemp: number;
  dailySunrise: string;
  dailySunset: string;
  dailyUVIndex: number;
}

interface CurrentWeatherData {
  currTemp: number;
  currAppTemp: number;
  currPrec: number;
  currWeatherCode: number;
  currWindSpeed: number;
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

const processDailyWeatherData = (data: AnyObject): DailyWeatherData[] => {
  const arrObject: AnyObject = {};

  // Convert values in the data object to arrays if they are objects
  for (const [key, value] of Object.entries(data)) {
    if (typeof value == "object" && !Array.isArray(value) && value !== null) {
      arrObject[key] = Object.values(value);
    } else {
      arrObject[key] = value;
    }
  }

  const result: DailyWeatherData[] = [];
  for (let i = 0; i < arrObject.dates.length; i++) {
    const resultObj = {} as DailyWeatherData;

    // Adding daily data
    resultObj.date = arrObject.dates[i];
    resultObj.dailyWeatherCode = arrObject.dailyWeatherCode[i];
    resultObj.dailyMaxTemp = arrObject.dailyMaxTemp[i];
    resultObj.dailyMinTemp = arrObject.dailyMinTemp[i];
    resultObj.dailySunrise = arrObject.dailySunrise[i];
    resultObj.dailySunset = arrObject.dailySunset[i];
    resultObj.dailyUVIndex = arrObject.dailyUVIndex[i];

    // Adding hourly data
    const start = i * 24;
    const end = start + 24;
    resultObj.hourlyTemp = arrObject.hourlyTemp.slice(start, end);
    resultObj.hourlyAppTemp = arrObject.hourlyAppTemp.slice(start, end);
    resultObj.hourlyPrecProb = arrObject.hourlyPrecProb.slice(start, end);
    resultObj.hourlyPrec = arrObject.hourlyPrec.slice(start, end);
    resultObj.hourlyWeatherCode = arrObject.hourlyWeatherCode.slice(start, end);
    resultObj.hourlyWindSpeed = arrObject.hourlyWindSpeed.slice(start, end);

    result.push(resultObj);
  }

  return result;
};

const processCurrentWeatherData = (data: AnyObject): CurrentWeatherData => {
  const result: CurrentWeatherData = {
    currTemp: data.currTemp,
    currAppTemp: data.currAppTemp,
    currPrec: data.currPrec,
    currWeatherCode: data.currWeatherCode,
    currWindSpeed: data.currWindSpeed,
  };

  return result;
};

const WeatherComponent: React.FC<WeatherComponentProps> = ({
  latitude,
  longitude,
  location,
}) => {
  const [dailyWeatherData, setDailyWeatherData] = useState<
    DailyWeatherData[] | null
  >(null);
  const [currWeatherData, setCurrWeatherData] =
    useState<CurrentWeatherData | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `/weather?latitude=${latitude}&longitude=${longitude}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch weather data");
        }
        const data = await response.json();
        const dailyData = processDailyWeatherData(data);
        const currData = processCurrentWeatherData(data);
        setDailyWeatherData(dailyData);
        setCurrWeatherData(currData);
        setError("");
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
        setDailyWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, location, dailyWeatherData, currWeatherData]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {dailyWeatherData && (
        <LineChart
          data={dailyWeatherData[0].hourlyTemp}
          labels={generateHours()}
          dataLabel="Temperature"
          unit="°C"
        />
      )}
      {dailyWeatherData && <p>{dailyWeatherData[0].date}</p>}
      {dailyWeatherData && (
        <LineChart
          data={dailyWeatherData[0].hourlyWindSpeed}
          labels={generateHours()}
          dataLabel="Wind Speed"
          unit="km/h"
        />
      )}
    </div>
  );
};

export default WeatherComponent;
