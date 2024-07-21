import React from "react";
import axios from "axios";
import img from "../images/location-button.svg";

interface LocationButtonProps {
  onCitySelect: (lat: string, lng: string, loc: string) => void;
}

const LocationButton: React.FC<LocationButtonProps> = ({ onCitySelect }) => {
  const handleGetLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const fetchedPlaceName = await fetchPlaceName(latitude, longitude);
            if (fetchedPlaceName) {
              onCitySelect(
                latitude.toString(),
                longitude.toString(),
                fetchedPlaceName
              );
            } else {
              console.error("Location not found");
            }
          } catch (error) {
            console.error("Error getting location:", error);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
        }
      );
    } else {
      console.error("Geolocation not supported by this browser.");
    }
  };

  const fetchPlaceName = async (
    lat: number,
    lng: number
  ): Promise<string | null> => {
    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${lng},${lat}.json`,
        {
          params: {
            access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            limit: 1,
          },
        }
      );

      const features = response.data.features[0]?.context || [];
      let city = "";
      let country = "";

      for (const feature of features) {
        if (feature.id.includes("place")) {
          city = feature.text;
        } else if (feature.id.includes("country")) {
          country = feature.text;
        }
      }

      if (city && country) {
        return `${city}, ${country}`;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error while fetching place name:", error);
      return null;
    }
  };

  return (
    <div>
      <button className="location-button" onClick={handleGetLocation}>
        <img src={img} alt="Current Location Button" />
      </button>
    </div>
  );
};

export default LocationButton;
