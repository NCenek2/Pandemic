import { Button } from "react-bootstrap";
import usePlayer from "../Hooks/usePlayer";

type ExecuteButtonProps = {
  onClick?: () => void;
};

const ExecuteButton = ({ onClick }: ExecuteButtonProps) => {
  const { isValidAction, executeAction } = usePlayer();

  const execute = () => {
    executeAction();

    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      disabled={!isValidAction}
      onClick={() => execute()}
      className={`btn-md align-self-center ${isValidAction ? "btn-success" : "btn-danger"}`}
    >
      Execute
    </Button>
  );
};

export default ExecuteButton;
