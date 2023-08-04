/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useGoogleMaps } from "../../context/GoogleMapsContext";

const LocationInput = ({ setLocation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const { isLoaded, loadError } = useGoogleMaps();

  const autocompleteServiceRef = useRef(null);
  const geocoderRef = useRef(null);
  const userLocationRef = useRef(null);

  useEffect(() => {
    if (
      navigator.geolocation &&
      isLoaded &&
      window.google &&
      window.google.maps
    ) {
      navigator.geolocation.getCurrentPosition((position) => {
        userLocationRef.current = new window.google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
      });
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  const handleAutocomplete = (input) => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (autocompleteServiceRef.current && input) {
        autocompleteServiceRef.current.getPlacePredictions(
          { input, location: userLocationRef.current, radius: 50000 },
          (predictions, status) => {
            status === window.google.maps.places.PlacesServiceStatus.OK
              ? setSuggestions(predictions)
              : setError("Invalid address");
          }
        );
      }
    }, 1000);
  };

  const handleSuggestionClick = (suggestion) => {
    geocoderRef.current?.geocode(
      { address: suggestion.description },
      (results, status) => {
        if (status === window.google.maps.GeocoderStatus.OK) {
          const location = results[0].geometry.location;
          setLocation({ lat: location.lat(), lng: location.lng() });
          setInputValue(suggestion.description); // Set the input text
        } else {
          setError("Failed to get location coordinates");
        }
      }
    );
    setSuggestions([]);
  };

  const handleCurrentLocationClick = (event) => {
    event.preventDefault();
    setLocation({
      lat: userLocationRef.current.lat(),
      lng: userLocationRef.current.lng(),
    });
    setInputValue("mi ubicacion");
    setSuggestions([]);
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map</div>;

  return (
    <div id="location-input-container">
      <input
        type="text"
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
          handleAutocomplete(e.target.value);
        }}
      />
      {/* <button onClick={handleCurrentLocationClick}>mi ubicacion</button> */}
      <div className="suggestions">
        {suggestions.map((suggestion) => (
          <div
            key={suggestion.place_id}
            onClick={() => handleSuggestionClick(suggestion)}
          >
            {suggestion.description}
          </div>
        ))}
      </div>
      {error && <div className="error">{error}</div>}
    </div>
  );
};

export default LocationInput;
