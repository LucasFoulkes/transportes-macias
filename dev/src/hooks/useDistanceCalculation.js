import { useState, useEffect } from 'react';

const calculateDistance = (originLocation, destinationLocation, setDistancia, setTiempo) => {
  const directionsService = new window.google.maps.DirectionsService();
  directionsService.route(
    {
      origin: originLocation,
      destination: destinationLocation,
      travelMode: 'DRIVING',
    },
    (result, status) => {
      if (status === window.google.maps.DirectionsStatus.OK) {
        const distanceValue = result.routes[0].legs[0].distance.text;
        const durationValue = result.routes[0].legs[0].duration.text;
        setDistancia(distanceValue);
        setTiempo(durationValue);
      } else {
        console.error('Error calculating distance. Please try again.');
      }
    }
  );
};

export const useDistanceCalculation = (originLocation, destinationLocation) => {
  const [Distancia, setDistancia] = useState('');
  const [Tiempo, setTiempo] = useState('');

  useEffect(() => {
    if (originLocation && destinationLocation) {
      calculateDistance(originLocation, destinationLocation, setDistancia, setTiempo);
    }
  }, [originLocation, destinationLocation]);

  return { Distancia, Tiempo };
};
