import { useState } from "react";
import LocationInput from "./LocationInput";
import { GoogleMapsProvider } from "../../context/GoogleMapsContext";
import Map from "./Map";

const Form = () => {
  const [location, setLocation] = useState("");

  return (
    <form>
      <GoogleMapsProvider>
        <LocationInput setLocation={setLocation} />
        <Map direction={location} />
      </GoogleMapsProvider>
    </form>
  );
};

export default Form;
