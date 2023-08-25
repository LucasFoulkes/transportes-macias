import { useNavigate } from "react-router-dom";

export default function WelcomePage() {
  const navigate = useNavigate();
  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="page-container">
      <button onClick={() => handleButtonClick("/visitante")}>visitante</button>
      <button onClick={() => handleButtonClick("/crear-cuenta")}>
        crear cuenta
      </button>
    </div>
  );
}
