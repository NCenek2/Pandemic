import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const RestartButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate("/")} className="btn btn-dark w-100">
      Restart Game
    </Button>
  );
};

export default RestartButton;
