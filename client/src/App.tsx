import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>("");

  const navigate = useNavigate();

  const handleCitySelect = (lat: string, lng: string, loc: string) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocation(loc);
    console.log(`lat: ${lat}, lng: ${lng}, loc: ${loc}`);
    navigate("/weatherpage");
  };

  const handleDateSelect = (date: string) => {
    setSelectedDate(date);
    console.log(date);
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onCitySelect={handleCitySelect}
              onDateSelect={handleDateSelect}
            />
          }
        />
        <Route
          path="/weatherpage"
          element={
            <WeatherPage
              onCitySelect={handleCitySelect}
              onDateSelect={handleDateSelect}
              latitude={latitude}
              longitude={longitude}
              location={location}
              selectedDate={selectedDate}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
