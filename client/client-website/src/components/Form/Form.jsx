import React, { useState } from "react";
import LocationInput from "./LocationInput";
import { GoogleMapsProvider } from "../../context/GoogleMapsContext";
import Map from "./Map";
import camionetaImage from "../../assets/truck_1.png";
import camionImage from "../../assets/truck_2.png";
import camionGrandeImage from "../../assets/truck_3.png";
import camionImage4 from "../../assets/truck_4.png";
import camionImage5 from "../../assets/truck_5.png";
import camionImage6 from "../../assets/truck_6.png";
import camionImage7 from "../../assets/truck_7.png";

const Form = () => {
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [distance, setDistance] = useState(0);
  const [vehicleType, setVehicleType] = useState(null);
  const [cashValue, setCashValue] = useState(null);

  const calculateCashValue = (distance, vehicleType) => {
    let rate;
    switch (vehicleType) {
      case "Camioneta":
        rate = 1.5;
        break;
      case "Camion":
        rate = 2.0;
        break;
      case "Camion Grande":
        rate = 2.5;
        break;
      default:
        rate = 0;
    }
    return distance * rate;
  };

  const handleVehicleClick = (type) => {
    setVehicleType(type);
  };

  const handleCalculateClick = () => {
    const value = calculateCashValue(distance, vehicleType);
    setCashValue(value);
  };

  return (
    <section id="calculadora">
      <div className="calculadora">
        <GoogleMapsProvider>
          <LocationInput
            setLocation={setLocation}
            label={"ubicacion inicial"}
          />
          <LocationInput setLocation={setTarget} label={"destino"} />
          <Map
            startLocation={location}
            target={target} // Changed from targetLocation to target
            setDistance={setDistance}
          />
        </GoogleMapsProvider>
        <div className="vehiculos">
          <button onClick={() => handleVehicleClick("Camioneta")}>
            <img src={camionetaImage} alt="Camioneta" />
          </button>
          <button onClick={() => handleVehicleClick("Camion")}>
            <img src={camionImage} alt="Camion" />
          </button>
          <button onClick={() => handleVehicleClick("Camion Grande")}>
            <img src={camionGrandeImage} alt="Camion Grande" />
          </button>
          {/* Additional buttons for new images */}
          <button onClick={() => handleVehicleClick("Camion 4")}>
            <img src={camionImage4} alt="Camion 4" />
          </button>
          <button onClick={() => handleVehicleClick("Camion 5")}>
            <img src={camionImage5} alt="Camion 5" />
          </button>
          <button onClick={() => handleVehicleClick("Camion 6")}>
            <img src={camionImage6} alt="Camion 6" />
          </button>
          <button onClick={() => handleVehicleClick("Camion 7")}>
            <img src={camionImage7} alt="Camion 7" />
          </button>
        </div>
        <button
          id="calcular"
          onClick={() => {
            handleCalculateClick();
          }}
        >
          calcular
        </button>
        <span>{cashValue !== null && `S/. ${cashValue.toFixed(2)}`}</span>
      </div>
    </section>
  );
};

export default Form;
