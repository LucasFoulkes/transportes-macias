/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";

const GoogleMapsContext = createContext(null);

export const useGoogleMaps = () => useContext(GoogleMapsContext);

const libraries = ["places"];

export const GoogleMapsProvider = ({ children }) => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: "AIzaSyCGHcl2Nbor4m80KE3s8yWaLz8lgnE5dGk",
    libraries,
  });

  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error(`Error Code = ${error.code} - ${error.message}`);
        }
      );
    } else {
      console.log("Geolocation is not supported by your browser");
    }
  }, []);

  return (
    <GoogleMapsContext.Provider value={{ isLoaded, loadError, location }}>
      {children}
    </GoogleMapsContext.Provider>
  );
};
