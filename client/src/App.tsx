import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherComponent from "./components/WeatherComponent";
import LocationButton from "./components/LocationButton";

const App: React.FC = () => {
  const [latitude, setLatitude] = useState<string | null>(null);
  const [longitude, setLongitude] = useState<string | null>(null);
  const [location, setLocation] = useState<string | null>(null);

  const handleCitySelect = (lat: string, lng: string, loc: string) => {
    setLatitude(lat);
    setLongitude(lng);
    setLocation(loc);
  };

  return (
    <div>
      <SearchBar onCitySelect={handleCitySelect} />
      <LocationButton onCitySelect={handleCitySelect} />
      {latitude && longitude && location && (
        <WeatherComponent
          latitude={latitude}
          longitude={longitude}
          location={location}
        />
      )}
    </div>
  );
};

export default App;
