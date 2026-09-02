import { Button } from "react-bootstrap";
import useTurn from "../Hooks/useTurn";

type ExecuteButtonProps = {
  onClick?: () => void;
};

const ExecuteButton = ({ onClick }: ExecuteButtonProps) => {
  const { isValidTurn, executeTurn } = useTurn();

  const execute = () => {
    executeTurn();

    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      disabled={!isValidTurn}
      onClick={() => execute()}
      className={`btn-md align-self-center ${isValidTurn ? "btn-success" : "btn-danger"}`}
    >
      Execute
    </Button>
  );
};

export default ExecuteButton;
