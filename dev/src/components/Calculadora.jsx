import { useState, useEffect } from "react";
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
  const [origin, setOrigin] = useState(null);
  const [destination, setDestination] = useState(null);
  const [originInput, setOriginInput] = useState("");
  const [destinationInput, setDestinationInput] = useState("");

  const { Distancia, Tiempo } = useDistanceCalculation(origin, destination);

  // Get current date and time
  const currentDate = new Date().toISOString().split("T")[0];
  const currentTime = new Date().toTimeString().split(" ")[0].slice(0, 5);

  // Store current date and time in session storage
  sessionStorage.setItem("currentDate", currentDate);
  sessionStorage.setItem("currentTime", currentTime);

  const swapLocations = () => {
    [setOrigin, setDestination] = [setDestination, setOrigin];
    [setOriginInput, setDestinationInput] = [
      setDestinationInput,
      setOriginInput,
    ];
  };

  const handleContinue = () => {
    if (!origin || !destination) {
      toast.error("Both origin and destination locations are required!");
      return;
    }
    sessionStorage.setItem("origin", JSON.stringify(origin));
    sessionStorage.setItem("destination", JSON.stringify(destination));
    sessionStorage.setItem("Distancia", Distancia);
    sessionStorage.setItem("Tiempo", Tiempo);
    navigate("/vehicle-selection");
  };

  useEffect(() => {
    sessionStorage.clear();
  }, []);

  return (
    <div className="page-container">
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <GoBackButton />
        <form>
          <LocationInput
            setLocation={setOrigin}
            currentLocation={currentLocation}
            inputValue={originInput}
            setInputValue={setOriginInput}
            useMyLocation={true}
            placeholder="origen"
          />
          <button type="button" onClick={swapLocations}>
            <FontAwesomeIcon icon={faExchangeAlt} style={{ rotate: "90deg" }} />
          </button>
          <LocationInput
            setLocation={setDestination}
            currentLocation={currentLocation}
            inputValue={destinationInput}
            setInputValue={setDestinationInput}
            placeholder="destino"
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
          <button type="button" onClick={handleContinue}>
            continuar
          </button>
        </form>
      </LoadScript>
      <ToastContainer />
    </div>
  );
}
