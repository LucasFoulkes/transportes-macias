import { useState, useEffect } from "react";
import GoBackButton from "./GoBackButton";
import LocationInput from "./LocationInput";
import { LoadScript } from "@react-google-maps/api";
import useGeolocation from "../hooks/useGeolocation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExchangeAlt } from "@fortawesome/free-solid-svg-icons";

const libraries = ["places"];

const calculateDistance = (
  originLocation,
  destinationLocation,
  setDistancia,
  setTiempo
) => {
  const directionsService = new window.google.maps.DirectionsService();
  directionsService.route(
    {
      origin: originLocation,
      destination: destinationLocation,
      travelMode: "DRIVING",
    },
    (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        const distanceValue = result.routes[0].legs[0].distance.text;
        const durationValue = result.routes[0].legs[0].duration.text;
        setDistancia(distanceValue); // Set the distance
        setTiempo(durationValue); // Set the time
      } else {
        console.error("Error calculating distance. Please try again.");
      }
    }
  );
};

export default function Calculadora() {
  const currentLocation = useGeolocation();
  const [originLocation, setOriginLocation] = useState(null);
  const [destinationLocation, setDestinationLocation] = useState(null);
  const [originInputValue, setOriginInputValue] = useState("");
  const [destinationInputValue, setDestinationInputValue] = useState("");
  const [Distancia, setDistancia] = useState("");
  const [Tiempo, setTiempo] = useState("");

  // Get the current date and time
  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().split(" ")[0].slice(0, 5);

  const swapLocations = () => {
    setOriginLocation(destinationLocation);
    setDestinationLocation(originLocation);
    setOriginInputValue(destinationInputValue);
    setDestinationInputValue(originInputValue);
  };

  // if there is both an origin and a destination, calculate the distance once
  useEffect(() => {
    if (originLocation && destinationLocation) {
      calculateDistance(
        originLocation,
        destinationLocation,
        setDistancia,
        setTiempo
      );
    }
  }, [originLocation, destinationLocation]);

  return (
    <div className="Calculadora">
      <LoadScript
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
            placeholder={"origen"}
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
          <button>continuar</button>
        </form>
      </LoadScript>
    </div>
  );
}
