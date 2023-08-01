/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useGoogleMaps } from "../../context/GoogleMapsContext";

const Map = ({ startLocation, target, setDistance }) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef(null);
  const directionsServiceRef = useRef(null);
  const directionsRendererRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  useEffect(() => {
    // Get the current location of the browser
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latLng = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setCurrentLocation(latLng);
      });
    }
  }, []);

  useEffect(() => {
    if (isLoaded && window.google && window.google.maps) {
      const mapOptions = {
        center: currentLocation || startLocation || target,
        zoom: 15,
        streetViewControl: false,
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        rotateControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      // Add marker for start location
      if (startLocation) {
        new window.google.maps.Marker({
          position: startLocation,
          map,
        });
        map.setCenter(startLocation);
        map.setZoom(15);
      }

      // Add marker for target location and show path
      if (startLocation && target) {
        new window.google.maps.Marker({
          position: target,
          map,
        });

        directionsServiceRef.current =
          new window.google.maps.DirectionsService();
        directionsRendererRef.current =
          new window.google.maps.DirectionsRenderer();
        directionsRendererRef.current.setMap(map);

        const request = {
          origin: startLocation,
          destination: target,
          travelMode: window.google.maps.TravelMode.DRIVING,
        };

        directionsServiceRef.current.route(request, (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            directionsRendererRef.current.setDirections(result);
            // Calculate the distance in kilometers
            const distanceInMeters = result.routes[0].legs[0].distance.value;
            const distanceInKm = distanceInMeters / 1000;
            setDistance(distanceInKm);
          }
        });
      }
    }
  }, [isLoaded, startLocation, target, currentLocation, setDistance]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <div
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
      }}
    />
  );
};

export default Map;
