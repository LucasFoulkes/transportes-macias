import React, { useState, useEffect, useRef } from "react";
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

  const [selectedVehicleId, setSelectedVehicleId] = useState(null);
  const selectorRef = useRef(null);

  const handleVehicleClick = (vehicle) => {
    setVehicle(vehicle);
    setSelectedVehicleId(vehicle.id);
  };

  useEffect(() => {
    const selectedElement = document.querySelector(".vehicle-button.selected");
    if (selectedElement && selectorRef.current) {
      const offset =
        selectedElement.offsetLeft -
        selectorRef.current.offsetWidth / 2 +
        selectedElement.offsetWidth / 2;
      selectorRef.current.scrollLeft = offset;
    }
  }, [selectedVehicleId]);

  return (
    <div id="vehicle-selector" ref={selectorRef}>
      <div className="spacer"></div>
      {vehicles.map((vehicle) => (
        <button
          key={vehicle.id}
          className={`vehicle-button ${
            selectedVehicleId === vehicle.id ? "selected" : ""
          }`}
          onClick={() => handleVehicleClick(vehicle)}
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
