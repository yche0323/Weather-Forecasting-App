import React from "react";
import SearchBar from "../components/SearchBar";
import LocationButton from "../components/LocationButton";
import Calendar from "../components/Calendar";
import logo from "../images/logo.svg";
import "../css/HomePage.css";

interface HomePageProps {
  onCitySelect: (lat: string, lng: string, loc: string) => void;
  onDateSelect: (date: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onCitySelect, onDateSelect }) => {
  return (
    <div className="homepage">
      <img className="logo" src={logo} alt="Logo" />
      <div className="search-container">
        <Calendar onDateSelect={onDateSelect} />
        <SearchBar onCitySelect={onCitySelect} />
        <LocationButton onCitySelect={onCitySelect} />
      </div>
    </div>
  );
};

export default HomePage;
