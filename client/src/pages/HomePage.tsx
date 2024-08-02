import React from "react";
import SearchBar from "../components/SearchBar";
import LocationButton from "../components/LocationButton";
import logo from "../images/WeatherIcons/partly-cloudy-day.svg";
import "../css/HomePage.css";

interface HomePageProps {
  onCitySelect: (lat: string, lng: string, loc: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCitySelect }) => {
  return (
    <div className="homepage">
      <img className="logo" src={logo} alt="Logo" />
      <div className="search-container">
        <SearchBar onCitySelect={onCitySelect} />
        <LocationButton onCitySelect={onCitySelect} />
      </div>
    </div>
  );
};

export default HomePage;
