import GoBackButton from "./GoBackButton";
import { useNavigate } from "react-router-dom";

export default function Visitante() {
  const navigate = useNavigate();
  const handleButtonClick = (path) => {
    navigate(path);
  };

  return (
    <div className="page-container visitante">
      <GoBackButton />
      <form action="">
        <input type="tel" name="phone" id="phone" placeholder="telefono" />
        <button
          onClick={() => {
            handleButtonClick("/my-account");
          }}
        >
          continuar
        </button>
      </form>
    </div>
  );
}
