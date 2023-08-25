import GoBackButton from "./GoBackButton";
import { useNavigate } from "react-router-dom";

export default function MyAccount() {
  const navigate = useNavigate();
  const handleButtonClick = (path) => {
    navigate(path);
  };
  return (
    <div className="page-container">
      <GoBackButton />
      <button>viajes previos</button>
      <button>viajes activos</button>
      <button
        onClick={() => {
          handleButtonClick("/calculadora");
        }}
      >
        +
      </button>
    </div>
  );
}
