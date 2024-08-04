import React, { useState } from "react";
import Select from "react-select";
import axios from "axios";

// Define types for city data
interface CityOption {
  label: string;
  value: {
    city: string;
    state: string;
    country: string;
    lat: number;
    lng: number;
  };
}

interface SearchBarProps {
  onCitySelect: (lat: string, lng: string, loc: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
  const [options, setOptions] = useState<CityOption[]>([]);

  const fetchCities = async (input: string) => {
    if (input.length < 2) return;

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          input
        )}.json`,
        {
          params: {
            access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            limit: 5,
            types: "place",
          },
        }
      );

      const cities = response.data.features.map((feature: any) => ({
        label: feature.place_name,
        value: {
          city: feature.text, // Extract city name
          state:
            feature.context.find((c: any) => c.id.includes("region"))?.text ||
            "", // Extract state
          country:
            feature.context.find((c: any) => c.id.includes("country"))?.text ||
            "", // Extract country
          lat: feature.center[1],
          lng: feature.center[0],
        },
      }));
      setOptions(cities);
    } catch (error) {
      console.error("Error fetching citites:", error);
    }
  };

  const handleChange = (selectedOption: CityOption | null) => {
    if (selectedOption) {
      const { city, state, country } = selectedOption.value;
      fetchCoordinates(city, state, country);
    }
  };

  const fetchCoordinates = async (
    city: string,
    state: string,
    country: string
  ) => {
    try {
      const query = `${city}, ${state}, ${country}`;
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          query
        )}.json`,
        {
          params: {
            access_token: process.env.REACT_APP_MAPBOX_ACCESS_TOKEN,
            limit: 1,
          },
        }
      );
      const feature = response.data.features[0];
      const { center } = feature;
      const [lng, lat] = center;
      onCitySelect(lat.toString(), lng.toString(), `${city}, ${country}`);
    } catch (error) {
      console.error("Error fetching coordinates:", error);
    }
  };

  return (
    <Select
      className="search-bar"
      options={options}
      onInputChange={(inputValue) => {
        fetchCities(inputValue)
          .then()
          .catch((error) => console.log("Error updating cities:", error));
      }}
      onChange={handleChange}
      placeholder="Enter a city"
    />
  );
};

export default SearchBar;
