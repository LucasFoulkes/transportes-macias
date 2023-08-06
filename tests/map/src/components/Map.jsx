import React from 'react';
import { GoogleMap, LoadScript } from '@react-google-maps/api';

const center = {
  lat: -3.745,
  lng: -38.523
};

function Map() {
  return (
    <LoadScript
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY}
    >
      <div id="map-container"> {/* Apply the ID to a div wrapper */}
        <GoogleMap
          mapContainerStyle={{ width: '100%', height: '100%' }} // Set width and height to 100% to fill the container
          center={center}
          zoom={10}
        >
          { /* You can add markers or other components here */}
        </GoogleMap>
      </div>
    </LoadScript>
  );
}

export default React.memo(Map);
