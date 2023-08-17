import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();

  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="WelcomePage">
      <button onClick={() => handleButtonClick("/login")}>login</button>
      <button onClick={() => handleButtonClick("/crear-cuenta")}>
        registrarse
      </button>
      <button onClick={() => handleButtonClick("/visitante")}>visitante</button>
    </div>
  );
}
