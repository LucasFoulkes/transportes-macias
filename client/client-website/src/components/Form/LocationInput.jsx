/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const LocationInput = ({ location, setLocation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const autocompleteServiceRef = useRef(null);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCGHcl2Nbor4m80KE3s8yWaLz8lgnE5dGk",
    libraries,
  });

  useEffect(() => {
    if (isLoaded && window.google && window.google.maps) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
    }
  }, [isLoaded]);

  const handleAutocomplete = (input) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (autocompleteServiceRef.current && input) {
        autocompleteServiceRef.current.getPlacePredictions(
          { input },
          (predictions, status) => {
            if (status !== window.google.maps.places.PlacesServiceStatus.OK) {
              setError("Invalid address");
              return;
            }
            setSuggestions(predictions);
          }
        );
      }
    }, 1100);
  };

  const handleLocationChange = (e) => {
    setLocation(e.target.value);
    handleAutocomplete(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(suggestion.description);
    setSuggestions([]); // Clear suggestions
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map</div>;

  return (
    <div>
      <input type="text" value={location} onChange={handleLocationChange} />
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.place_id}
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion.description}
        </div>
      ))}
      {error && <div>Invalid address</div>}
    </div>
  );
};

export default LocationInput;
