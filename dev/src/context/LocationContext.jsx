import React, { createContext, useState } from "react";

// Create the context
export const LocationContext = createContext();

// Create the provider component
export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null); // Initial value can be set here

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};
