export default function Confirmar() {
  // Safely parse JSON from session storage
  const safeParse = (key) => {
    try {
      return JSON.parse(sessionStorage.getItem(key));
    } catch (error) {
      return null;
    }
  };

  const originLocation = safeParse("originLocation");
  const destinationLocation = safeParse("destinationLocation");
  const selectedVehicle = safeParse("selectedVehicle");
  const origen = sessionStorage.getItem("origen");
  const destino = sessionStorage.getItem("destino");
  const currentDate = sessionStorage.getItem("currentDate");
  const currentTime = sessionStorage.getItem("currentTime");

  // Extract the vehicle ID if the selectedVehicle object exists
  const vehicleId = selectedVehicle ? selectedVehicle.id : null;

  const Distancia = sessionStorage.getItem("Distancia");
  const Tiempo = sessionStorage.getItem("Tiempo");

  return (
    <div className="Confirmar">
      <h2>Session Storage Contents:</h2>
      {vehicleId && <p>Selected Vehicle ID: {vehicleId}</p>}
      {origen && <p>Origen: {origen}</p>}
      {destino && <p>Destino: {destino}</p>}
      {originLocation && (
        <p>
          Origin Location: Latitude: {originLocation.lat}, Longitude:{" "}
          {originLocation.lng}
        </p>
      )}
      {destinationLocation && (
        <p>
          Destination Location: Latitude: {destinationLocation.lat}, Longitude:{" "}
          {destinationLocation.lng}
        </p>
      )}
      {Distancia && <p>Distance: {Distancia}</p>}
      {Tiempo && <p>Time: {Tiempo}</p>}
      {currentDate && <p>Date: {currentDate}</p>}
      {currentTime && <p>Time: {currentTime}</p>}
    </div>
  );
}
