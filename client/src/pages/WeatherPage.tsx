import React, { useEffect } from "react";
import SearchBar from "../components/SearchBar";
import LocationButton from "../components/LocationButton";
import Calendar from "../components/Calendar";
import WeatherComponent from "../components/WeatherComponent";
import logo from "../images/WeatherIcons/partly-cloudy-day.svg";
import { useNavigate } from "react-router-dom";
import "../css/WeatherPage.css";

interface WeatherPageProps {
  onCitySelect: (lat: string, lng: string, loc: string) => void;
  onDateSelect: (date: string) => void;
  latitude: string | null;
  longitude: string | null;
  location: string | null;
  selectedDate: string;
}

const WeatherPage: React.FC<WeatherPageProps> = (props) => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  };

  useEffect(() => {
    const today = new Date();
    let fullDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${today.getDate().toString().padStart(2, "0")}`;

    console.log(fullDate);

    if (props.selectedDate) {
      fullDate = props.selectedDate;
    }

    const dateObj = new Date(fullDate);

    const month = dateObj.toLocaleDateString("en-GB", { month: "long" });
    const day = props.selectedDate.slice(-2);

    const monthElement = document.getElementById("month");
    const dayElement = document.getElementById("day");

    if (monthElement && dayElement) {
      monthElement.innerText = month;
      dayElement.innerText = day;
    }
  }, [props.location, props.selectedDate]);

  return (
    <div className="weatherpage">
      <div className="outer-header">
        <button className="logo-button" onClick={handleLogoClick}>
          <img className="logo" src={logo} alt="Logo" />
        </button>
        <div className="inner-header">
          <Calendar onDateSelect={props.onDateSelect} />
          <SearchBar onCitySelect={props.onCitySelect} />
          <LocationButton onCitySelect={props.onCitySelect} />
        </div>
      </div>
      {props.latitude && props.longitude && props.location && (
        <div>
          <div className="content-header">
            <div className="date-displayer">
              <div className="month" id="month"></div>
              <div className="day" id="day"></div>
            </div>
            <h1 className="location-header">
              <span className="city">{props.location.split(",")[0]}</span>
              <span className="country">
                {", " + props.location.split(",")[1]}
              </span>
            </h1>
          </div>
          {props.latitude && props.longitude && props.location && (
            <WeatherComponent
              latitude={props.latitude}
              longitude={props.longitude}
              location={props.location}
              selectedDate={props.selectedDate}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
