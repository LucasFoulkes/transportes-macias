import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

function LocationInput({
  setLocation,
  currentLocation,
  inputValue,
  setInputValue,
  placeholder,
  useMyLocation = false,
}) {
  const [autocomplete, setAutocomplete] = useState(null);
  const [isMyLocationClicked, setIsMyLocationClicked] = useState(false);

  const onPlaceChanged = () => {
    if (autocomplete !== null) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        let location = place.geometry.location;
        setLocation({
          lat: location.lat(),
          lng: location.lng(),
          input: place.formatted_address,
        });
        setInputValue(place.formatted_address);
      } else {
        console.log("Selected place has no geometry!");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  useEffect(() => {
    if (useMyLocation && !isMyLocationClicked) {
      setLocation(currentLocation);
      setInputValue("mi ubicación");
    }
  }, [
    useMyLocation,
    isMyLocationClicked,
    currentLocation,
    setLocation,
    setInputValue,
  ]);

  const handleInputClick = () => {
    if (useMyLocation && !isMyLocationClicked) {
      setInputValue(""); // Set the input value to an empty string when "My Location" is clicked
      setIsMyLocationClicked(true);
    }
  };

  return (
    <div className="location">
      <Autocomplete
        onLoad={setAutocomplete}
        onPlaceChanged={onPlaceChanged}
        id="autocomplete"
      >
        <input
          type="text"
          placeholder={placeholder}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onClick={handleInputClick}
        />
      </Autocomplete>
    </div>
  );
}

export default LocationInput;
