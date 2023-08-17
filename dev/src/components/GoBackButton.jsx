import { useNavigate } from "react-router-dom";

export default function GoBackButton() {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <button className="GoBackButton" onClick={handleGoBack}>
      &lt;
    </button>
  );
}
