import { Button } from "react-bootstrap";
import useGame from "../Hooks/useGame";
import { usePlayer } from "../Hooks/usePlayer";

type CureStatusesProps = {
  suffix: string;
};

const CureStatuses = ({ suffix }: CureStatusesProps) => {
  const { cures } = useGame();
  const { setSelectedColor } = usePlayer();
  return (
    <div className="d-flex justify-content-center">
      {cures.map((cure) => (
        <Button
          key={`Cure_${cure.color}${suffix}`}
          className="me-2 btn-white btn-sm"
          variant={cure.cured ? "outline-success" : "outline-danger"}
          onClick={() => setSelectedColor(cure.color)}
        >
          {cure.color} {cure.cured}
        </Button>
      ))}
    </div>
  );
};

export default CureStatuses;
