import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackButton from "./GoBackButton";
import LocationInput from "./LocationInput";
import { LoadScript } from "@react-google-maps/api";
import useGeolocation from "../hooks/useGeolocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";
import { useDistanceCalculation } from "../hooks/useDistanceCalculation";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const libraries = ["places"];

export default function Calculadora() {
  const navigate = useNavigate();
  const currentLocation = useGeolocation();
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [originInputValue, setOriginInputValue] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");

  const { Distancia, Tiempo } = useDistanceCalculation(
    originLocation,
    destinationLocation
  );

  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().split(" ")[0].slice(0, 5);

  const swapLocations = () => {
    setOriginLocation(destinationLocation);
    setDestinationLocation(originLocation);
    setOriginInputValue(destinationInputValue);
    setDestinationInputValue(originInputValue);
  };

  const handleContinueClick = () => {
    if (!originLocation || !destinationLocation) {
      toast.error("Both origin and destination locations are required!");
      return;
    }
    sessionStorage.setItem("originLocation", JSON.stringify(originLocation));
    sessionStorage.setItem(
      "destinationLocation",
      JSON.stringify(destinationLocation)
    );
    sessionStorage.setItem("Distancia", Distancia); // Storing distance
    sessionStorage.setItem("Tiempo", Tiempo); // Storing time
    navigate("/vehicle-selection");
  };

  return (
    <div className="Calculadora">
      <LoadScript
        className="map"
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoBackButton />
        <form action="">
          <LocationInput
            setLocation={setOriginLocation}
            currentLocation={currentLocation}
            inputValue={originInputValue}
            setInputValue={setOriginInputValue}
            useMyLocation={true}
          />
          <button type="button" onClick={swapLocations}>
            <FontAwesomeIcon icon={faExchangeAlt} style={{ rotate: "90deg" }} />
          </button>
          <LocationInput
            setLocation={setDestinationLocation}
            currentLocation={currentLocation}
            inputValue={destinationInputValue}
            setInputValue={setDestinationInputValue}
            placeholder={"destino"}
          />
          <input
            type="date"
            name="fecha"
            id="fecha"
            placeholder="fecha"
            defaultValue={currentDate}
          />
          <input
            type="time"
            name="hora"
            id="hora"
            placeholder="hora"
            defaultValue={currentTime}
          />
          <button type="button" onClick={handleContinueClick}>
            continuar
          </button>
        </form>
      </LoadScript>
      <ToastContainer />
    </div>
  );
}
