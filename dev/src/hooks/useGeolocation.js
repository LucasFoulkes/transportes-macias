import { useState, useEffect } from "react";
import { toast } from "react-toastify";

function useGeolocation() {
  const [location, setLocation] = useState({
    lat: -2.170998,
    lng: -79.9223592,
  }); // Guayaquil, Ecuador

  useEffect(() => {
    let isMounted = true; // Track whether component is mounted

    const successLocation = (position) => {
      if (isMounted) {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      }
    };

    const errorLocation = () => {
      toast.error("Unable to retrieve your location.");
    };

    if (navigator.permissions) {
      // Check for geolocation permission
      navigator.permissions.query({ name: "geolocation" }).then((result) => {
        if (result.state === "granted" || result.state === "prompt") {
          // If granted or prompt then directly get the location
          navigator.geolocation.getCurrentPosition(
            successLocation,
            errorLocation
          );
        } else if (result.state === "denied") {
          // If denied then use default location
          toast.error(
            "Geolocation is not enabled. Please enable to get current location."
          );
        }
      });
    } else {
      // If permissions API not supported
      navigator.geolocation.getCurrentPosition(successLocation, errorLocation);
    }

    return () => {
      isMounted = false; // Component unmounted
    };
  }, []);

  return location;
}

export default useGeolocation;
