/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import { useGoogleMaps } from "../../context/GoogleMapsContext";

const SetCurrentLocationButton = ({ setLocation }) => {
  const [userLocation, setUserLocation] = useState(null);
  const { isLoaded, loadError } = useGoogleMaps();

  useEffect(() => {
    if (navigator.geolocation && isLoaded) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(latLng);
      });
    }
  }, [isLoaded]);

  const handleCurrentLocationClick = () => {
    if (userLocation) {
      setLocation(userLocation);
    }
  };

  if (loadError) return <div>Error loading map</div>;
  if (!isLoaded) return <div>Loading map</div>;

  return (
    <button onClick={handleCurrentLocationClick}>Use Current Location</button>
  );
};

export default SetCurrentLocationButton;
