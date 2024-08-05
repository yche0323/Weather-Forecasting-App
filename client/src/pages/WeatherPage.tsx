import React, { useState, useEffect } from "react";
import SearchBar from "../components/SearchBar";
import LocationButton from "../components/LocationButton";
import Calendar from "../components/Calendar";
import CurrentWeatherComponent from "../components/WeatherSubcomponents/CurrentWeatherComponent";
import WeatherComponent from "../components/WeatherComponent";
import logo from "../images/logo.svg";
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

interface CurrentWeatherData {
  currTemp: number;
  currAppTemp: number;
  currWeatherCode: number;
}

const WeatherPage: React.FC<WeatherPageProps> = (props) => {
  const [currWeatherData, setCurrWeatherData] =
    useState<CurrentWeatherData | null>(null);

  const handleSetCurrWeatherData = (
    currTemp: number,
    currAppTemp: number,
    currWeatherCode: number
  ) => {
    const result: CurrentWeatherData = {
      currTemp: currTemp,
      currAppTemp: currAppTemp,
      currWeatherCode: currWeatherCode,
    };

    setCurrWeatherData(result);
  };

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
      <div className="outer-most-header">
        <div className="outer-header">
          <div className="inner-header">
            <button className="logo-button" onClick={handleLogoClick}>
              <img className="logo" src={logo} alt="Logo" />
            </button>
            <div className="search-container">
              <Calendar onDateSelect={props.onDateSelect} />
              <SearchBar onCitySelect={props.onCitySelect} />
              <LocationButton onCitySelect={props.onCitySelect} />
            </div>
          </div>
          {props.location && (
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
          )}
        </div>
        {currWeatherData && (
          <CurrentWeatherComponent
            currTemp={currWeatherData.currTemp}
            currAppTemp={currWeatherData.currAppTemp}
            currWeatherCode={currWeatherData.currWeatherCode}
          />
        )}
      </div>
      {props.latitude && props.longitude && props.location && (
        <div>
          {
            <WeatherComponent
              setCurrWeatherData={handleSetCurrWeatherData}
              latitude={props.latitude}
              longitude={props.longitude}
              location={props.location}
              selectedDate={props.selectedDate}
            />
          }
        </div>
      )}
    </div>
  );
};

export default WeatherPage;
