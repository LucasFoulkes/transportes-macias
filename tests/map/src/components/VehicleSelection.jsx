import vehicle1 from "../assets/truck_1.png";
import vehicle2 from "../assets/truck_2.png";
import vehicle3 from "../assets/truck_3.png";
import vehicle4 from "../assets/truck_4.png";
import vehicle5 from "../assets/truck_5.png";
import vehicle6 from "../assets/truck_6.png";
import vehicle7 from "../assets/truck_7.png";

const VehicleSelection = ({ setVehicle }) => {
  const vehicles = [
    { id: 1, image: vehicle1 },
    { id: 2, image: vehicle2 },
    { id: 3, image: vehicle3 },
    { id: 4, image: vehicle4 },
    { id: 5, image: vehicle5 },
    { id: 6, image: vehicle6 },
    { id: 7, image: vehicle7 },
  ];

  const handleVehicleClick = (vehicle) => {
    setVehicle(vehicle);
  };

  return (
    <div className="vehicle-selection">
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          className="vehicle-button"
          onClick={() => handleVehicleClick(vehicle.id)}
        >
          <img
            src={vehicle.image}
            alt={`Vehicle ${vehicle.id}`}
            className="vehicle-image"
          />
        </button>
      ))}
    </div>
  );
};

export default VehicleSelection;
