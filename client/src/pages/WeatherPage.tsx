import React from "react";
import SearchBar from "../components/SearchBar";
import LocationButton from "../components/LocationButton";
import WeatherComponent from "../components/WeatherComponent";
import logo from "../images/WeatherIcons/partly-cloudy-day.svg";
import { useNavigate } from "react-router-dom";
import "../css/WeatherPage.css";

interface WeatherPageProps {
  onCitySelect: (lat: string, lng: string, loc: string) => void;
  latitude: string | null;
  longitude: string | null;
  location: string | null;
}

const WeatherPage: React.FC<WeatherPageProps> = (props) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  return (
    <div className="weatherpage">
      <div className="outer-header">
        <button className="logo-button" onClick={handleLogoClick}>
          <img className="logo" src={logo} alt="Logo" />
        </button>
        <div className="inner-header">
          <SearchBar onCitySelect={props.onCitySelect} />
          <LocationButton onCitySelect={props.onCitySelect} />
        </div>
      </div>
      {props.latitude && props.longitude && props.location && (
        <div>
          <h1 className="location-header">
            <span className="city">{props.location.split(",")[0]}</span>
            <span className="country">
              {", " + props.location.split(",")[1]}
            </span>
          </h1>
          {props.latitude && props.longitude && props.location && (
            <WeatherComponent
              latitude={props.latitude}
              longitude={props.longitude}
              location={props.location}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
