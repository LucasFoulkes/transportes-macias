import { useState } from "react";
import LocationInput from "./LocationInput";
import { GoogleMapsProvider } from "../../context/GoogleMapsContext";
import Map from "./Map";

const Form = () => {
  const [location, setLocation] = useState("");
  const [target, setTarget] = useState("");
  const [distance, setDistance] = useState(0);

  return (
    <form>
      <GoogleMapsProvider>
        <LocationInput setLocation={setLocation} />
        <LocationInput setLocation={setTarget} />
        <Map
          startLocation={location}
          target={target}
          setDistance={setDistance}
        />
      </GoogleMapsProvider>
      {distance > 0 && <h2>Distance: {distance} km</h2>}
    </form>
  );
};

export default Form;
