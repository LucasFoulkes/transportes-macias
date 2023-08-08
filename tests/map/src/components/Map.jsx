import React, { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationInput from "./LocationInput";
import { LoadScript } from "@react-google-maps/api";
import useGeolocation from "../hooks/useGeolocation";
import { VscArrowSwap } from "react-icons/vsc";

const libraries = ["places"];

function Map() {
  const currentLocation = useGeolocation();
  const [startLocation, setStartLocation] = useState({
    lat: 0,
    lng: 0,
    input: "",
  });
  const [destination, setDestination] = useState({ lat: 0, lng: 0, input: "" });
  const [distancia, setDistancia] = useState(0);
  const [duration, setDuration] = useState(0);

  const calculateDistance = () => {
    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: startLocation,
        destination: destination,
        travelMode: "DRIVING",
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          const distanceValue = result.routes[0].legs[0].distance.text;
          const durationValue = result.routes[0].legs[0].duration.text;
          setDistancia(distanceValue);
          setDuration(durationValue);
        } else {
          toast.error("Error calculating distance. Please try again.");
        }
      }
    );
  };

  const swapLocations = () => {
    const tempLocation = startLocation;
    setStartLocation(destination);
    setDestination(tempLocation);
  };

  const renderLocationInput = (location, setLocation, placeholder) => {
    return (
      <LocationInput
        setLocation={setLocation}
        currentLocation={currentLocation}
        placeholder={placeholder}
        inputValue={location.input}
        setInputValue={(input) => setLocation({ ...location, input })}
      />
    );
  };

  return (
    <div id="calculadora">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        {renderLocationInput(startLocation, setStartLocation, "Origen")}
        {renderLocationInput(destination, setDestination, "Destino")}
        <div id="swap" onClick={swapLocations}>
          <VscArrowSwap id="swap-icon" size={25} />
        </div>
        <button onClick={calculateDistance}>calcular</button>
        <ToastContainer />
      </LoadScript>
    </div>
  );
}

export default Map;
