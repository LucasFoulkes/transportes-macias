import { useState } from "react";

const UserForm = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numeroDeCedula: "",
    numeroDeTelefono: "",
    email: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    for (const key in formData) {
      if (!formData[key]) newErrors[key] = `${key} is required.`;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      console.log(formData);
      setErrors({});
      // Proceed with form submission
    }
  };

  return (
    <form onSubmit={handleSubmit} id="userForm">
      <div>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          value={formData.nombre}
          onChange={handleChange}
          className={errors.nombre ? "error-border" : ""}
        />
        {errors.nombre && <span className="error">{errors.nombre}</span>}
      </div>
      <div>
        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          value={formData.apellido}
          onChange={handleChange}
          className={errors.apellido ? "error-border" : ""}
        />
        {errors.apellido && <span className="error">{errors.apellido}</span>}
      </div>
      <div>
        <label htmlFor="numeroDeCedula">Número de Cédula:</label>
        <input
          type="text"
          id="numeroDeCedula"
          value={formData.numeroDeCedula}
          onChange={handleChange}
          className={errors.numeroDeCedula ? "error-border" : ""}
        />
        {errors.numeroDeCedula && (
          <span className="error">{errors.numeroDeCedula}</span>
        )}
      </div>
      <div>
        <label htmlFor="numeroDeTelefono">Número de Teléfono:</label>
        <input
          type="tel"
          id="numeroDeTelefono"
          value={formData.numeroDeTelefono}
          onChange={handleChange}
          className={errors.numeroDeTelefono ? "error-border" : ""}
        />
        {errors.numeroDeTelefono && (
          <span className="error">{errors.numeroDeTelefono}</span>
        )}
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "error-border" : ""}
        />
        {errors.email && <span className="error">{errors.email}</span>}
      </div>
      <button type="submit">confirmar</button>
    </form>
  );
};

export default UserForm;
