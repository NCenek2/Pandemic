import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { BASENAME } from "../Game/Constants/Constants";

const RestartButton = () => {
  const navigate = useNavigate();
  return (
    <Button onClick={() => navigate(BASENAME)} className="btn btn-dark w-100">
      Restart Game
    </Button>
  );
};

export default RestartButton;
