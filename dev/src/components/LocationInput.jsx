import React, { useState, useEffect } from "react";

function LocationInput({
  setLocation,
  currentLocation,
  inputValue,
  setInputValue,
  placeholder,
  useMyLocation = false,
}) {
  const [suggestions, setSuggestions] = useState([]);
  const [isUsingMyLocation, setIsUsingMyLocation] = useState(useMyLocation);

  useEffect(() => {
    if (isUsingMyLocation && currentLocation) {
      setInputValue("mi ubicación");
      setLocation(currentLocation);
      sessionStorage.setItem(placeholder, "mi ubicación");
    }
  }, [
    isUsingMyLocation,
    currentLocation,
    setInputValue,
    setLocation,
    placeholder,
  ]);

  const handleAutocomplete = (input) => {
    if (input && !isUsingMyLocation) {
      const autocompleteService =
        new window.google.maps.places.AutocompleteService();
      autocompleteService.getPlacePredictions(
        {
          input,
          locationBias: {
            center: new window.google.maps.LatLng(
              currentLocation.lat,
              currentLocation.lng
            ),
            radius: 49999,
          },
        },
        (predictions, status) => {
          setSuggestions(
            status === window.google.maps.places.PlacesServiceStatus.OK
              ? predictions
              : []
          );
        }
      );
    }
  };

  const handleSuggestionClick = (suggestion) => {
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address: suggestion.description }, (results, status) => {
      if (status === window.google.maps.GeocoderStatus.OK) {
        const location = results[0].geometry.location;
        setLocation({ lat: location.lat(), lng: location.lng() });
        setInputValue(suggestion.description);
        sessionStorage.setItem(placeholder, suggestion.description);
      }
    });
    setSuggestions([]);
  };

  const handleInputClick = () => {
    if (useMyLocation && inputValue === "mi ubicación") {
      setInputValue("");
    }
  };

  const handleInputBlur = () => {
    if (useMyLocation && !inputValue) {
      setInputValue("mi ubicación");
      sessionStorage.setItem(placeholder, "mi ubicación");
    } else if (inputValue && inputValue !== "mi ubicación") {
      sessionStorage.setItem(placeholder, inputValue);
    }
  };

  return (
    <div className="location">
      <input
        type="text"
        placeholder={isUsingMyLocation ? "mi ubicación" : placeholder}
        value={inputValue}
        onChange={(e) => {
          setIsUsingMyLocation(false);
          setInputValue(e.target.value);
          handleAutocomplete(e.target.value);
        }}
        onClick={handleInputClick}
        onBlur={handleInputBlur}
      />
      {suggestions.length > 0 && (
        <div
          className="suggestion-dropdown"
          style={{ border: "1px solid #ccc", position: "absolute" }}
        >
          {suggestions.map((suggestion) => (
            <div
              className="suggestion"
              key={suggestion.place_id}
              onClick={() => handleSuggestionClick(suggestion)}
              style={{ padding: "5px", cursor: "pointer" }}
            >
              {suggestion.description}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LocationInput;
