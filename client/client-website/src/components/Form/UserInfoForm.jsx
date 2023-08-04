import { useState } from "react";

const UserInfoForm = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [numeroDeCedula, setNumeroDeCedula] = useState("");
  const [numeroDeTelefono, setNumeroDeTelefono] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can handle the form submission here, such as sending the data to an API or updating the state in a parent component.
    console.log({ nombre, apellido, numeroDeCedula, numeroDeTelefono });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="numeroDeCedula">Número de Cédula:</label>
        <input
          type="text"
          id="numeroDeCedula"
          value={numeroDeCedula}
          onChange={(e) => setNumeroDeCedula(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="numeroDeTelefono">Número de Teléfono:</label>
        <input
          type="tel"
          id="numeroDeTelefono"
          value={numeroDeTelefono}
          onChange={(e) => setNumeroDeTelefono(e.target.value)}
          required
        />
      </div>
      <button type="submit">Enviar</button>
    </form>
  );
};

export default UserInfoForm;
