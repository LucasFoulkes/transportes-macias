/* eslint-disable react/prop-types */
import React, { useState, useEffect } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useGoogleMaps } from "../../context/GoogleMapsContext";

const Map = ({ direction }) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setCurrentPosition({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = currentPosition || { lat: 0, lng: 0 }; // Default to (0, 0) if current position is not available

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      zoom={15}
      center={direction || center}
      options={{ disableDefaultUI: true }}
    >
      {direction && <Marker position={direction} />}
    </GoogleMap>
  );
};

export default Map;
