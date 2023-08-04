import { useState } from "react";
import LocationInput from "./LocationInput";
import { GoogleMapsProvider } from "../../context/GoogleMapsContext";
import Map from "./Map";
import camionetaImage from "../../assets/camioneta.svg";
import camionImage from "../../assets/camion.svg";
import camionGrandeImage from "../../assets/camion-grande.svg";
import UserInfoForm from "./UserInfoForm"; // Import the UserInfoForm component

const Form = () => {
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [distance, setDistance] = useState(0);
  const [vehicleType, setVehicleType] = useState(null); // Store the selected vehicle type
  const [cashValue, setCashValue] = useState(null);
  const [showReservationForm, setShowReservationForm] = useState(false); // State to control the display of the reservation form

  const calculateCashValue = (distance, vehicleType) => {
    let rate;
    switch (vehicleType) {
      case "Camioneta":
        rate = 1.5; // Example rate for Camioneta
        break;
      case "Camion":
        rate = 2.0; // Example rate for Camion
        break;
      case "Camion Grande":
        rate = 2.5; // Example rate for Camion Grande
        break;
      default:
        rate = 0;
    }
    return distance * rate;
  };

  const handleVehicleClick = (type) => {
    setVehicleType(type); // Store the selected vehicle type
  };

  const handleCalculateClick = () => {
    const value = calculateCashValue(distance, vehicleType);
    setCashValue(value);
  };

  const handleReserveClick = () => {
    setShowReservationForm(true);
  };

  return (
    <>
      <section id="calculadora">
        <h2>calculadora</h2>
        <div className="calculadora">
          {distance === 0 && (
            <GoogleMapsProvider>
              <LocationInput setLocation={setLocation} />
              <LocationInput setLocation={setTarget} />
            </GoogleMapsProvider>
          )}
        </div>
      </section>
    </>
  );
};

export default Form;
