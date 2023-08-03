import { useState } from "react";
import LocationInput from "./LocationInput";
import { GoogleMapsProvider } from "../../context/GoogleMapsContext";
import Map from "./Map";
import camionetaImage from "../../assets/camioneta.svg";
import camionImage from "../../assets/camion.svg";
import camionGrandeImage from "../../assets/camion-grande.svg";

const Form = () => {
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [distance, setDistance] = useState(0);
  const [cashValue, setCashValue] = useState(null);

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
    const value = calculateCashValue(distance, type);
    setCashValue(value);
  };

  return (
    <>
      <section id="calculadora">
        <h1>calculadora</h1>
        <fieldset>
          {distance === 0 && (
            <GoogleMapsProvider>
              <LocationInput setLocation={setLocation} />
              <LocationInput setLocation={setTarget} />
              <Map
                startLocation={location}
                target={target}
                setDistance={setDistance}
              />
            </GoogleMapsProvider>
          )}
          {distance > 0 && cashValue === null && (
            <div className="vehicle-buttons-container">
              <div className="vehicle-buttons">
                <div className="vehicle-button">
                  <button onClick={() => handleVehicleClick("Camioneta")}>
                    <img src={camionetaImage} alt="Camioneta" />
                  </button>
                  <span>Camioneta</span>
                </div>
                <div className="vehicle-button">
                  <button onClick={() => handleVehicleClick("Camion")}>
                    <img src={camionImage} alt="Camion" />
                  </button>
                  <span>Camion</span>
                </div>
                <div className="vehicle-button">
                  <button onClick={() => handleVehicleClick("Camion Grande")}>
                    <img src={camionGrandeImage} alt="Camion Grande" />
                  </button>
                  <span>Camion Grande</span>
                </div>
              </div>
            </div>
          )}
          {cashValue !== null && (
            <div>
              <p>Total Cost: ${cashValue.toFixed(2)}</p>
            </div>
          )}
        </fieldset>
      </section>
    </>
  );
};

export default Form;
