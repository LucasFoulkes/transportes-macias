import React, { useState } from "react";
import GoBackButton from "./GoBackButton";
import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";

const fetchVehicles = async () => {
  const res = await fetch("https://translogisticamacias.ec/cars");
  if (!res.ok) {
    throw new Error("Failed to fetch vehicles");
  }
  return res.json();
};

export default function VehicleSelection() {
  const {
    data: vehicles,
    isLoading,
    isError,
  } = useQuery("vehicles", fetchVehicles);

  const [selectedRow, setSelectedRow] = useState(null);
  const navigate = useNavigate();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading vehicles</div>;

  const headers = ["descripcion"];

  const handleRowClick = (index) => {
    if (selectedRow === index) {
      sessionStorage.setItem(
        "selectedVehicle",
        JSON.stringify(vehicles[selectedRow])
      );
      navigate("/confirmar");
    } else {
      setSelectedRow(index);
    }
  };

  return (
    <div className="VehicleSelection">
      <GoBackButton />
      <div className="vehicle-list">
        {vehicles?.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className={`vehicle-row ${selectedRow === index ? "selected" : ""}`}
            onClick={() => handleRowClick(index)}
          >
            <div className="vehicle-image">
              <img
                src={`https://translogisticamacias.ec/images/${vehicle.imagen}`}
                alt={vehicle.descripcion}
              />
            </div>
            {headers.map((header) => (
              <div key={header} className="vehicle-detail">
                {vehicle[header]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
