import React, { useState } from "react";
import GoBackButton from "./GoBackButton";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";

const queryClient = new QueryClient();

const fetchVehicles = async () => {
  const res = await fetch("https://foulkes.studio/cars");
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading vehicles</div>;

  // Define the keys you want to display
  const headers = ["descripcion"];

  return (
    <div className="VehicleSelection">
      <GoBackButton />
      <div className="vehicle-list">
        {vehicles?.map((vehicle, index) => (
          <div
            key={vehicle.id}
            className={`vehicle-row ${selectedRow === index ? "selected" : ""}`}
            onClick={() => setSelectedRow(index)}
          >
            <div className="vehicle-image">
              <img
                src={`https://foulkes.studio/images/${vehicle.imagen}`}
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
