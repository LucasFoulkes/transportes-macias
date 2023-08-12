import React, { useState, useEffect } from "react";
import { Autocomplete } from "@react-google-maps/api";

function LocationInput({
  setLocation,
  currentLocation,
  inputValue,
  setInputValue,
}) {
  const [autocomplete, setAutocomplete] = useState(null);

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
      } else {
        console.log("Selected place has no geometry!");
      }
    } else {
      console.log("Autocomplete is not loaded yet!");
    }
  };

  useEffect(() => {
    if (autocomplete) {
      const currentLocationLatLng = new window.google.maps.LatLng(
        currentLocation.lat,
        currentLocation.lng
      );
      const bounds = new window.google.maps.LatLngBounds();
      bounds.extend(
        new window.google.maps.LatLng(
          currentLocationLatLng.lat() + 0.1,
          currentLocationLatLng.lng() + 0.1
        )
      );
      bounds.extend(
        new window.google.maps.LatLng(
          currentLocationLatLng.lat() - 0.1,
          currentLocationLatLng.lng() - 0.1
        )
      );
      autocomplete.setOptions({
        bounds: bounds,
        rankBy: window.google.maps.places.RankBy.DISTANCE,
      });
    }
  }, [autocomplete, currentLocation]);

  return (
    <Autocomplete onLoad={setAutocomplete} onPlaceChanged={onPlaceChanged}>
      <input
        type="text"
        placeholder="Search Location"
        style={{ width: "100%", height: "40px" }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
    </Autocomplete>
  );
}

export default LocationInput;
