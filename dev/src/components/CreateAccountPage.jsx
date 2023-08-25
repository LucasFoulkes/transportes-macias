import GoBackButton from "./GoBackButton";

export default function CreateAccountPage() {
  return (
    <div className="page-container">
      <GoBackButton />
      <form>
        <input
          type="text"
          id="name"
          name="name"
          required
          placeholder="nombre"
        />
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email (opcional)"
        />
        <input
          type="tel"
          id="phone"
          name="phone"
          pattern="09[0-9]{8}|[0-9]{7}"
          placeholder="telefono"
        />
        <input
          type="text"
          id="username"
          name="username"
          placeholder="usuario"
        />
        <input
          type="password"
          id="password"
          name="password"
          required
          minLength="8"
          placeholder="contraseña"
        />
        <input
          type="password"
          id="passwordConfirmation"
          name="passwordConfirmation"
          required
          minLength="8"
          placeholder="confirmar contraseña"
        />
        <button type="submit">crear</button>
      </form>
    </div>
  );
}
