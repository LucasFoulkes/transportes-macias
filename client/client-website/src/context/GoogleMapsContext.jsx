/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useLoadScript } from "@react-google-maps/api";

const GoogleMapsContext = createContext(null);

export const useGoogleMaps = () => useContext(GoogleMapsContext);

const libraries = ["places"];

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCGHcl2Nbor4m80KE3s8yWaLz8lgnE5dGk",
    libraries,
  });

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
