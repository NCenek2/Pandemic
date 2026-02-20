import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RestartButton = () => {
  const navigate = useNavigate();

  const restartGame = () => {
    navigate("/"); // Navigate to home route
    window.location.reload();
  };

  return (
    <Button onClick={restartGame} className="btn btn-dark w-100">
      Restart Game
    </Button>
  );
};

export default RestartButton;
