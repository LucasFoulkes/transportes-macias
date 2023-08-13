import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LocationInput from "./LocationInput";
import { LoadScript } from "@react-google-maps/api";
import useGeolocation from "../hooks/useGeolocation";
import { VscArrowSwap } from "react-icons/vsc";
import VehicleSelection from "./VehicleSelection";

const libraries = ["places"];

function MakeReservation({ cost }) {
  return (
    <div id="make-reservation">
      <div id="cost">
        <span id="cost-label">Costo:</span>
        <span id="cost-value">{cost} USD</span>
      </div>
      <button id="make-reservation-button">Reservar</button>
    </div>
  );
}

function Calculadora() {
  const currentLocation = useGeolocation();
  const [startLocation, setStartLocation] = useState({
    lat: 0,
    lng: 0,
    input: "",
  });
  const [destination, setDestination] = useState({ lat: 0, lng: 0, input: "" });
  const [distancia, setDistancia] = useState("0 km");
  const [duration, setDuration] = useState("0 mins");
  const [vehicle, setVehicle] = useState(null);
  const [cost, setCost] = useState(0);

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

  const calculateCost = () => {
    calculateDistance();
    const distanceInKm = parseFloat(distancia.split(" ")[0]);
    const durationInMinutes = parseFloat(duration.split(" ")[0]);
    const vehicleCostMap = {
      1: 5,
      2: 10,
      3: 15,
      4: 20,
      5: 25,
      6: 30,
      7: 35,
    };
    const costPerKm = vehicleCostMap[vehicle.id] || 0;
    const totalCost = distanceInKm * costPerKm + durationInMinutes * 0.1;
    console.log(distanceInKm);
    console.log(durationInMinutes);
    console.log(vehicle);
    console.log(vehicleCostMap[vehicle.id]);
    console.log(totalCost);
    setCost(totalCost);
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
    <div id={`calculadora${cost > 0 ? "-active" : ""}`}>
      <LoadScript
        googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
        libraries={libraries}
      >
        <>
          <>
            {renderLocationInput(startLocation, setStartLocation, "Origen")}
            <button id="swap" onClick={swapLocations}>
              <VscArrowSwap id="swap-icon" size={25} />
            </button>
            {renderLocationInput(destination, setDestination, "Destino")}
            <VehicleSelection setVehicle={setVehicle} />
            <button className="continuar" onClick={calculateCost}>
              continuar
            </button>
          </>
        </>
        <ToastContainer />
      </LoadScript>
    </div>
  );
}
export default Calculadora;