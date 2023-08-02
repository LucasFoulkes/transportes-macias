import { useState } from "react";
import LocationInput from "./LocationInput";
import { GoogleMapsProvider } from "../../context/GoogleMapsContext";
import Map from "./Map";

const Form = () => {
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [distance, setDistance] = useState(0);
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  return (
    <form className="form-container">
      <section>
        <fieldset>
          <GoogleMapsProvider>
            <legend>Calculadora</legend>
            <label htmlFor="pickup">Ubicación de Recojida:</label>
            <LocationInput id="pickup" setLocation={setLocation} />
            <label htmlFor="delivery">Ubicación de Entrega:</label>
            <LocationInput id="delivery" setLocation={setTarget} />
            <Map
              startLocation={location}
              target={target}
              setDistance={setDistance}
            />
          </GoogleMapsProvider>
          <div className="vehicle-selection">
            <button type="button">Camioneta</button>
            <button type="button">Camioneta</button>
            <button type="button">Camión Grande</button>
          </div>
          {distance > 0 && <h2>Distance: {distance} km</h2>}
          <button type="button">Calcular</button>
        </fieldset>
      </section>
      <fieldset className="personal-info">
        <legend>Información Personal</legend>
        <label htmlFor="name">Nombre:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <label htmlFor="phone">Número de Teléfono:</label>
        <input
          type="tel"
          id="phone"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
        />
        <input type="number" id="cedula" />
        <label htmlFor="terms">
          <input type="checkbox" id="terms" />
          Acepto los <a href="#">términos y condiciones</a>
        </label>
      </fieldset>
      <button type="submit">Confirmar</button>
    </form>
  );
};

export default Form;
