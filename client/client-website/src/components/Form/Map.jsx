/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from "react";
import { useGoogleMaps } from "../../context/GoogleMapsContext";

const Map = ({ startLocation, target, setDistance }) => {
  const { isLoaded, loadError } = useGoogleMaps();
  const mapRef = useRef(null);
  const [currentLocation, setCurrentLocation] = useState(null);

  // Function to add a marker to the map
  const addMarker = (location, map) => {
    new window.google.maps.Marker({
      position: location,
      map,
    });
  };

  // Function to calculate and display the route
  const calculateRoute = (start, target, map) => {
    const directionsService = new window.google.maps.DirectionsService();
    const directionsRenderer = new window.google.maps.DirectionsRenderer();
    directionsRenderer.setMap(map);

    const request = {
      origin: start,
      destination: target,
      travelMode: window.google.maps.TravelMode.DRIVING,
    };

    directionsService.route(request, (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
        const distanceInMeters = result.routes[0].legs[0].distance.value;
        const distanceInKm = distanceInMeters / 1000;
        setDistance(distanceInKm);
      }
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  useEffect(() => {
    if (isLoaded && window.google && window.google.maps) {
      const mapOptions = {
        center: currentLocation || startLocation || target,
        zoom: 15,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        rotateControl: false,
        fullscreenControl: false,
        keyboardShortcuts: false,
      };

      const map = new window.google.maps.Map(mapRef.current, mapOptions);

      if (startLocation) {
        addMarker(startLocation, map);
        map.setCenter(startLocation);
        map.setZoom(15);
      }

      if (startLocation && target) {
        addMarker(target, map);
        calculateRoute(startLocation, target, map);
      }
    }
  }, [isLoaded, startLocation, target, currentLocation, setDistance]);

  if (loadError) return <div>Error loading maps</div>;
  if (!isLoaded) return <div>Loading maps</div>;

  return (
    <div
      id="map"
      ref={mapRef}
      style={{
        width: "100%",
        height: "400px",
      }}
    />
  );
};

export default Map;
