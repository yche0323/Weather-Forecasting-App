import React, { useState, useEffect } from "react";

interface WeatherComponentProps {
  latitude: string;
  longitude: string;
  location: string;
}

const WeatherComponent: React.FC<WeatherComponentProps> = ({
  latitude,
  longitude,
  location,
}) => {
  const [weatherData, setWeatherData] = useState(null);
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
        console.log(data);
        setWeatherData(data);
        setError("");
      } catch (e) {
        if (e instanceof Error) {
          setError(e.message);
        } else {
          setError("An unknown error occurred");
        }
        setWeatherData(null);
      }
    };

    fetchWeatherData();
  }, [latitude, longitude, location]);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {weatherData && <div>{/* Placeholder */}</div>}
    </div>
  );
};

export default WeatherComponent;
