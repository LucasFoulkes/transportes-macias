import { useState } from "react";
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
import UserForm from "./UserForm";

const Form = () => {
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [distance, setDistance] = useState(0);
  const [vehicleType, setVehicleType] = useState(null);
  const [cashValue, setCashValue] = useState(null);
  const [error, setError] = useState(null);
  const [reservation, setReservation] = useState(false);

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
      case "Camion 4":
        rate = 3.0;
        break;
      case "Camion 5":
        rate = 3.5;
        break;
      case "Camion 6":
        rate = 4.0;
        break;
      case "Camion 7":
        rate = 4.5;
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
    if (!location || !target || !distance || !vehicleType) {
      setError("Please fill in all fields before calculating.");
      return;
    }
    const value = calculateCashValue(distance, vehicleType);
    setCashValue(value);
    setError(null); // Clear any previous error
  };

  return (
    <section id="calculadora">
      <div className="calculadora">
        {cashValue == null && (
          <>
            <GoogleMapsProvider>
              <LocationInput
                setLocation={setLocation}
                label={"ubicacion inicial"}
              />
              <LocationInput setLocation={setTarget} label={"destino"} />
              <Map
                startLocation={location}
                target={target}
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
            <button id="calcular" onClick={handleCalculateClick}>
              calcular
            </button>
          </>
        )}
        {error && <div className="error">{error}</div>}
        {cashValue > 0 && !reservation && (
          <>
            <button
              id="reservar"
              onClick={() => {
                setReservation(true);
              }}
            >{`reservar por S/. ${cashValue.toFixed(2)}!`}</button>
            <button
              id="recalcular"
              onClick={() => {
                setCashValue(null);
                setVehicleType(null);
              }}
            >
              recalcular
            </button>
          </>
        )}
        {reservation && <UserForm />}
      </div>
    </section>
  );
};

export default Form;
