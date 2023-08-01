import { useState, useRef, useEffect } from "react";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const Form = () => {
  const [location, setLocation] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [center, setCenter] = useState({ lat: 40.73061, lng: -73.935242 }); // Default to New York
  const [error, setError] = useState(null);
  const timeoutRef = useRef(null);
  const autocompleteServiceRef = useRef(null);
  const mapRef = useRef(null);

  const mapContainerStyle = { width: "400px", height: "300px" };

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCGHcl2Nbor4m80KE3s8yWaLz8lgnE5dGk",
    libraries,
  });

  useEffect(() => {
    // Get the user's current location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCenter({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => null
    );
  }, []);

  const onLoad = (map) => {
    mapRef.current = map;
    autocompleteServiceRef.current =
      new window.google.maps.places.AutocompleteService();
  };

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

    // Get details of the selected location to place a pin on the map
    const placesService = new window.google.maps.places.PlacesService(
      mapRef.current
    );
    placesService.getDetails(
      { placeId: suggestion.place_id },
      (place, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK) {
          const newLocation = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          };
          setSelectedLocation(newLocation);
          setCenter(newLocation); // Update center to selected location
          mapRef.current.setZoom(15); // Zoom in to selected location
        }
      }
    );
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
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={8}
        center={center}
        onLoad={onLoad}
        options={{
          streetViewControl: true, // Enable Street View Control
          zoomControl: true, // Enable Zoom Control
          mapTypeControl: false, // Disable Map Type Control
          scaleControl: false, // Disable Scale Control
          rotateControl: false, // Disable Rotate Control
          fullscreenControl: false, // Disable Fullscreen Control
        }}
      >
        {selectedLocation && <Marker position={selectedLocation} />}
      </GoogleMap>
    </div>
  );
};

export default Form;
