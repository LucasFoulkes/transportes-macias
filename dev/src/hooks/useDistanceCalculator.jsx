import { useState, useEffect } from "react";

const useDistanceCalculator = (originLocation, destinationLocation) => {
  const [Distancia, setDistancia] = useState("");
  const [Tiempo, setTiempo] = useState("");

  useEffect(() => {
    if (originLocation && destinationLocation) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: originLocation,
          destination: destinationLocation,
          travelMode: "DRIVING",
        },
        (result, status) => {
          if (status === window.google.maps.DirectionsStatus.OK) {
            const distanceValue = result.routes[0].legs[0].distance.text;
            const durationValue = result.routes[0].legs[0].duration.text;
            setDistancia(distanceValue);
            setTiempo(durationValue);
          } else {
            console.error("Error calculating distance. Please try again.");
          }
        }
      );
    }
  }, [originLocation, destinationLocation]);

  return [Distancia, Tiempo];
};

export default useDistanceCalculator;
