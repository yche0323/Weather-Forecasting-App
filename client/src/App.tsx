import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherComponent from "./components/WeatherComponent";

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);

  const handleCitySelect = (lat: string, lng: string) => {
    setLatitude(lat);
    setLongitude(lng);
  };

  return (
    <div>
      <SearchBar onCitySelect={handleCitySelect} />
      {latitude && longitude && (
        <WeatherComponent latitude={latitude} longitude={longitude} />
      )}
    </div>
  );
};

export default App;
