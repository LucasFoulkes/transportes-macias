import GoBackButton from "./GoBackButton";

export default function Login() {
  return (
    <div className="login">
      <GoBackButton />
      <form action="">
        <input
          type="text"
          name="username"
          id="username"
          placeholder="usuario o telefono"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="contraseña"
        />
        <input type="submit" value="login" />
      </form>
    </div>
  );
}
