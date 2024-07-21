import React, { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import WeatherPage from "./pages/WeatherPage";

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleCitySelect = (lat: string, lng: string, loc: string) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocation(loc);
    navigate("/weatherpage");
  };

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<HomePage onCitySelect={handleCitySelect} />}
        />
        <Route
          path="/weatherpage"
          element={
            latitude &&
            longitude &&
            location && (
              <WeatherPage
                onCitySelect={handleCitySelect}
                latitude={latitude}
                longitude={longitude}
                location={location}
              />
            )
          }
        />
      </Routes>
    </div>
  );
};

export default App;
