/* eslint-disable react/prop-types */
import { useState, useRef, useEffect } from "react";
import { useGoogleMaps } from "../../context/GoogleMapsContext";

const LocationInput = ({ setLocation }) => {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const autocompleteServiceRef = useRef(null);
  const geocoderRef = useRef(null);
  const [userLocation, setUserLocation] = useState(null);

  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latLng = new window.google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        setUserLocation(latLng);
      });
    }

    if (isLoaded && window.google && window.google.maps) {
      autocompleteServiceRef.current =
        new window.google.maps.places.AutocompleteService();
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isLoaded]);

  const handleAutocomplete = (input) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      if (autocompleteServiceRef.current && input) {
        const request = {
          input,
          location: userLocation,
          radius: 50000,
        };

        autocompleteServiceRef.current.getPlacePredictions(
          request,
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
    handleAutocomplete(e.target.value);
  };

  const handleSuggestionClick = (suggestion) => {
    if (geocoderRef.current) {
      geocoderRef.current.geocode(
        { address: suggestion.description },
        (results, status) => {
          if (status === window.google.maps.GeocoderStatus.OK) {
            const location = results[0].geometry.location;
            setLocation({ lat: location.lat(), lng: location.lng() });
          } else {
            setError("Failed to get location coordinates");
          }
        }
      );
    }
    setSuggestions([]); // Clear suggestions
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map</div>;

  return (
    <div>
      <input type="text" onChange={handleLocationChange} />
      {suggestions.map((suggestion) => (
        <div
          key={suggestion.place_id}
          onClick={() => handleSuggestionClick(suggestion)}
        >
          {suggestion.description}
        </div>
      ))}
      {error && <div>{error}</div>}
    </div>
  );
};

export default LocationInput;
