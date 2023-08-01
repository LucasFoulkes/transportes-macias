import { useState } from "react";
import LocationInput from "./LocationInput";

const Form = () => {
  const [location, setLocation] = useState("");

  return (
    <form>
      <LocationInput location={location} setLocation={setLocation} />
    </form>
  );
};

export default Form;
