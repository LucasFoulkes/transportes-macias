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
    }
  }, [isUsingMyLocation, currentLocation, setInputValue, setLocation]);

  const handleAutocomplete = async (input) => {
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
      }
    });
    setSuggestions([]);
  };

  const handleInputClick = () => {
    if (inputValue === "mi ubicación") {
      setInputValue(""); // Clear the input value if it's "mi ubicación"
    }
    setIsUsingMyLocation(false);
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
        onClick={handleInputClick} // Updated onClick handler
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
